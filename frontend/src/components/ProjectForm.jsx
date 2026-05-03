import { useState } from "react";

function ProjectForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({ name: "", description: "" });
  };

  return (
    <form className="card space-y-3" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">Create Project</h3>
      <input
        className="input"
        placeholder="Project name"
        value={form.name}
        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        required
      />
      <textarea
        className="input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
      />
      <button className="btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

export default ProjectForm;
