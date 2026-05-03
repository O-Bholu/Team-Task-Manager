function ProjectCard({ project, onOpenTasks }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{project.description || "No description"}</p>
      <p className="mt-3 text-xs text-slate-500">Members: {project.members?.length || 0}</p>
      <div className="mt-4">
        <button className="btn-primary" onClick={() => onOpenTasks(project)}>
          View Tasks
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
