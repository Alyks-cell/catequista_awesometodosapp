import { useState } from "react";

const MIN_LENGTH = 4;

export default function TodoForm({ onCreate }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const trimmed = content.trim();
  const isValid = trimmed.length >= MIN_LENGTH;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    const created = await onCreate(trimmed);
    if (created) setContent("");
    setSubmitting(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-todo">
        New todo
      </label>
      <input
        id="new-todo"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new todo..."
        className="form__input"
        autoComplete="off"
        required
      />
      <button
        type="submit"
        className="form__button"
        disabled={!isValid || submitting}
      >
        {submitting ? "Creating..." : "Create Todo"}
      </button>
    </form>
  );
}
