const request = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  return res.json();
};

export const getTodos = () => request("/api/todos");

export const createTodo = (todo) =>
  request("/api/todos", {
    method: "POST",
    body: JSON.stringify({ todo }),
  });

// the server toggles the status, so we send the current one
export const updateTodo = (id, status) =>
  request(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

export const deleteTodo = (id) =>
  request(`/api/todos/${id}`, { method: "DELETE" });
