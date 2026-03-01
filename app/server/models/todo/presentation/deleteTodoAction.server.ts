import { redirect } from "react-router";
import { db } from "~/lib/db.server";

export const deleteTodoAction = async ({ params }: { params: { id: string } }) => {
  await db.todo.delete({ where: { id: params.id } });
  return redirect("/");
};
