import { useState } from "react";

function TaskForm({ projects, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    projectId: "",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    });

    setForm({
      title: "",
      description: "",
      assignedTo: "",
      projectId: "",
      dueDate: "",
    });
  };

  return (
    <form className="card space-y-3" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">Create Task</h3>
      <input
        className="input"
        placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
        required
      />
      <textarea
        className="input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
      />
      <input
        className="input"
        placeholder="Assigned user ID"
        value={form.assignedTo}
        onChange={(e) => setForm((p) => ({ ...p, assignedTo: e.target.value }))}
      />
      <select
        className="input"
        value={form.projectId}
        onChange={(e) => setForm((p) => ({ ...p, projectId: e.target.value }))}
        required
      >
        <option value="">Select project</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
      />
      <button className="btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;
