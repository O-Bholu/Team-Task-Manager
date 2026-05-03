function TaskCard({ task, onStatusChange, canUpdate = true }) {
  const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "DONE";

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold">{task.title}</h4>
          <p className="text-sm text-slate-600">{task.description || "No description"}</p>
          <p className="mt-2 text-xs text-slate-500">Assigned: {task.assignedTo || "Unassigned"}</p>
          <p className={`text-xs ${overdue ? "text-red-600" : "text-slate-500"}`}>
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
          </p>
        </div>

        <select
          className="input max-w-40"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          disabled={!canUpdate}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
    </div>
  );
}

export default TaskCard;
