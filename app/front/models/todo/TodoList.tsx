import { Link } from "react-router";
import type { Todo } from "@prisma/client";

const FILTER_LABELS = {
  all: "すべて",
  active: "未完了",
  completed: "完了済み",
} as const;

type Props = {
  todos: Todo[];
  filter: string;
};

export function TodoList({ todos, filter }: Props) {

  return (
    <>
      <div className="flex gap-2 mb-4">
        {(["all", "active", "completed"] as const).map((f) => (
          <Link
            key={f}
            to={f === "all" ? "/" : `/?filter=${f}`}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {FILTER_LABELS[f]}
          </Link>
        ))}
      </div>

      <ul className="space-y-2">
        {todos.length === 0 && (
          <li className="text-center text-gray-400 py-8">Todo がありません。</li>
        )}
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link
              to={`/todos/${todo.id}`}
              className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span
                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                  todo.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </p>
                {todo.body && (
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {todo.body}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
