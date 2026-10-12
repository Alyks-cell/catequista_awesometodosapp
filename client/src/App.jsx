import { useEffect, useMemo, useState } from "react";
import * as api from "./api";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Done" },
];

const EMPTY_MESSAGES = {
  all: "No todos yet. Add your first one above!",
  active: "Nothing left to do. Nice work!",
  done: "No completed todos yet.",
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getTodos()
      .then(setTodos)
      .catch(() => setError("Could not load your todos."))
      .finally(() => setLoading(false));
  }, []);

  const createTodo = async (content) => {
    try {
      const newTodo = await api.createTodo(content);
      setTodos((current) => [...current, newTodo]);
      setError("");
      return true;
    } catch {
      setError("Could not create the todo. Please try again.");
      return false;
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const json = await api.updateTodo(todo._id, todo.status);
      if (json.acknowledged) {
        setTodos((current) =>
          current.map((t) =>
            t._id === todo._id ? { ...t, status: !t.status } : t
          )
        );
      }
      setError("");
    } catch {
      setError("Could not update the todo. Please try again.");
    }
  };

  const deleteTodo = async (todo) => {
    try {
      const json = await api.deleteTodo(todo._id);
      if (json.acknowledged) {
        setTodos((current) => current.filter((t) => t._id !== todo._id));
      }
      setError("");
    } catch {
      setError("Could not delete the todo. Please try again.");
    }
  };

  const doneCount = todos.filter((t) => t.status).length;

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.status);
    if (filter === "done") return todos.filter((t) => t.status);
    return todos;
  }, [todos, filter]);

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Awesome Todos</h1>
        <p className="subtitle">
          {todos.length > 0
            ? `${doneCount} of ${todos.length} done`
            : "Stay on top of your day"}
        </p>
      </header>

      <TodoForm onCreate={createTodo} />

      {error && (
        <p className="alert" role="alert">
          {error}
        </p>
      )}

      <nav className="filters" aria-label="Filter todos">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`filters__button${
              filter === id ? " filters__button--active" : ""
            }`}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {loading ? (
        <p className="empty" aria-live="polite">
          Loading...
        </p>
      ) : visibleTodos.length > 0 ? (
        <ul className="todos">
          {visibleTodos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      ) : (
        <p className="empty">{EMPTY_MESSAGES[filter]}</p>
      )}
    </main>
  );
}
