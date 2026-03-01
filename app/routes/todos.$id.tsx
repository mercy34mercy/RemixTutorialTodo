import type { Route } from "./+types/todos.$id";
import { TodoDetail, TodoAction } from "~/front/models/todo/TodoDetail";
import { getTodoDetailLoader } from "~/server/models/todo/presentation/getTodoDetailLoader.server";
import { deleteTodoAction } from "~/server/models/todo/presentation/deleteTodoAction.server";
import { toggleTodoAction } from "~/server/models/todo/presentation/toggleTodoAction.server";

export { TodoAction };

export async function loader({ params }: Route.LoaderArgs) {
  return getTodoDetailLoader({ params });
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as TodoAction;

  switch (intent) {
    case TodoAction.DELETE:
      return deleteTodoAction({ params });
    case TodoAction.TOGGLE:
      return toggleTodoAction({ params });
    default: {
      const _exhaustiveCheck: never = intent;
      throw new Response(`サポートされていないintentです: ${_exhaustiveCheck}`, {
        status: 400,
      });
    }
  }
}

export function meta({ data }: Route.MetaArgs) {
  const title = data?.todo?.title ?? "Todo";
  return [{ title: `${title} — Todo アプリ` }];
}

export default function TodoDetailPage({ loaderData }: Route.ComponentProps) {
  return <TodoDetail todo={loaderData.todo} />;
}
