import { db } from "~/lib/db.server";

export const getTodoListLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") ?? "all";

  const where =
    filter === "active"
      ? { completed: false }
      : filter === "completed"
        ? { completed: true }
        : {};

  const todos = await db.todo.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return { todos, filter };
};
