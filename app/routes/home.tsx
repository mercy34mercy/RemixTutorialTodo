import type { Route } from "./+types/home";
import { CreateTodoForm } from "~/front/models/todo/CreateTodoForm";
import { TodoList } from "~/front/models/todo/TodoList";
import { getTodoListLoader } from "~/server/models/todo/presentation/getTodoListLoader.server";
import { createTodoAction } from "~/server/models/todo/presentation/createTodoAction.server";

export async function loader({ request }: Route.LoaderArgs) {
  return getTodoListLoader({ request });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  return createTodoAction({ formData });
}

export function meta() {
  return [{ title: "Todo アプリ" }];
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const { todos, filter } = loaderData;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo アプリ</h1>
      <CreateTodoForm lastResult={actionData?.submission} />
      <TodoList todos={todos} filter={filter} />
    </div>
  );
}
