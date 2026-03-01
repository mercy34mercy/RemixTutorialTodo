import { Form, Link } from "react-router";
import type { Todo } from "@prisma/client";

export enum TodoAction {
  DELETE = "delete",
  TOGGLE = "toggle",
}

type Props = {
  todo: Todo;
};

export function TodoDetail({ todo }: Props) {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6"
      >
        ← 一覧に戻る
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
              todo.completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {todo.completed ? "完了済み" : "未完了"}
          </span>
        </div>

        <h1
          className={`text-2xl font-bold mb-3 ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h1>

        {todo.body ? (
          <p className="text-gray-600 text-sm whitespace-pre-wrap mb-6">
            {todo.body}
          </p>
        ) : (
          <p className="text-gray-400 text-sm italic mb-6">詳細なし</p>
        )}

        <div className="text-xs text-gray-400 mb-6 space-y-1">
          <p>作成日時: {new Date(todo.createdAt).toLocaleString("ja-JP")}</p>
          <p>更新日時: {new Date(todo.updatedAt).toLocaleString("ja-JP")}</p>
        </div>

        <div className="flex gap-3">
          <Form method="post">
            <input type="hidden" name="intent" value={TodoAction.TOGGLE} />
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                todo.completed
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {todo.completed ? "未完了に戻す" : "完了にする"}
            </button>
          </Form>

          <Form
            method="post"
            onSubmit={(e) => {
              if (!confirm("この Todo を削除しますか？")) e.preventDefault();
            }}
          >
            <input type="hidden" name="intent" value={TodoAction.DELETE} />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            >
              削除
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
