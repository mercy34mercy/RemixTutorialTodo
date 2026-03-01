import { parseWithZod } from "@conform-to/zod";
import { createTodoSchema } from "~/front/models/todo/CreateTodoForm";
import { db } from "~/lib/db.server";

export const createTodoAction = async ({ formData }: { formData: FormData }) => {
  const submission = parseWithZod(formData, { schema: createTodoSchema });

  if (submission.status !== "success") {
    return { submission: submission.reply() };
  }

  await db.todo.create({
    data: {
      title: submission.value.title,
      body: submission.value.body || null,
    },
  });

  return { submission: submission.reply() };
};
