import { getFormProps, getInputProps, getTextareaProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form } from "react-router";
import type { SubmissionResult } from "@conform-to/react";
import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  body: z.string().optional(),
});

type Props = {
  lastResult?: SubmissionResult | null;
};

export function CreateTodoForm({ lastResult }: Props) {
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTodoSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">新しい Todo</h2>
      <Form method="post" {...getFormProps(form)} className="space-y-3">
        <input type="hidden" name="intent" value="createTodo" />
        <div>
          <input
            {...getInputProps(fields.title, { type: "text" })}
            placeholder="タイトル"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {fields.title.errors && (
            <p className="text-xs text-red-500 mt-1">{fields.title.errors[0]}</p>
          )}
        </div>
        <div>
          <textarea
            {...getTextareaProps(fields.body)}
            placeholder="詳細（任意）"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          追加
        </button>
      </Form>
    </div>
  );
}
