import { db } from "~/lib/db.server";

export const getTodoDetailLoader = async ({ params }: { params: { id: string } }) => {
  const todo = await db.todo.findUnique({ where: { id: params.id } });
  if (!todo) throw new Response("Not Found", { status: 404 });
  return { todo };
};
