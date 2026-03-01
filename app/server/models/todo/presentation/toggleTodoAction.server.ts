import { db } from "~/lib/db.server";

export const toggleTodoAction = async ({ params }: { params: { id: string } }) => {
  const todo = await db.todo.findUnique({ where: { id: params.id } });
  if (!todo) throw new Response("Not Found", { status: 404 });
  await db.todo.update({
    where: { id: params.id },
    data: { completed: !todo.completed },
  });
  return null;
};
