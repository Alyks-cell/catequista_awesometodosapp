export default function Todo({ todo, onToggle, onDelete }) {
  const className = `todo${todo.status ? " todo--done" : ""}`;

  return (
    <li className={className}>
      <button
        type="button"
        className="todo__status"
        onClick={() => onToggle(todo)}
        aria-pressed={todo.status}
        aria-label={
          todo.status ? "Mark todo as not done" : "Mark todo as done"
        }
      >
        <span className="todo__check" aria-hidden="true">
          {todo.status ? "✓" : ""}
        </span>
      </button>

      <p className="todo__text">{todo.todo}</p>

      <button
        type="button"
        className="todo__delete"
        onClick={() => onDelete(todo)}
        aria-label={`Delete todo: ${todo.todo}`}
      >
        🗑️
      </button>
    </li>
  );
}
