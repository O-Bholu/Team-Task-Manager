package com.taskmanager.service;

import com.taskmanager.dto.DashboardResponse;
import com.taskmanager.model.Task;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repo;
    private final com.taskmanager.repository.ProjectRepository projectRepo;

    public Task createTask(Task task) {
        if (task.getStatus() == null) task.setStatus(TaskStatus.TODO);
        return repo.save(task);
    }

    public Task updateTask(String id, Task updatedTask) {
        Task task = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setAssignedTo(updatedTask.getAssignedTo());
        task.setDueDate(updatedTask.getDueDate());
        return repo.save(task);
    }

    public void deleteTask(String id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Task not found");
        }
        repo.deleteById(id);
    }

    public Task updateStatus(String id, TaskStatus status) {
        Task task = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        return repo.save(task);
    }

    public List<Task> getTasksByProject(String projectId) {
        return repo.findByProjectId(projectId);
    }

    public List<Task> getAllTasksForUser(String userId, String userRole) {
        if ("ADMIN".equals(userRole)) {
            return repo.findAll();
        }
        return repo.findByAssignedTo(userId);
    }

    public DashboardResponse getDashboardSummary() {
        long totalProjects = projectRepo.count();
        List<Task> all = repo.findAll();
        long total = all.size();
        long completed = all.stream().filter(t -> t.getStatus() == TaskStatus.DONE).count();
        long pending = all.stream().filter(t -> t.getStatus() != TaskStatus.DONE).count();
        Date now = new Date();
        long overdue = all.stream()
                .filter(t -> t.getDueDate() != null)
                .filter(t -> t.getDueDate().before(now))
                .filter(t -> t.getStatus() != TaskStatus.DONE)
                .count();

        return new DashboardResponse(totalProjects, total, completed, pending, overdue);
    }
}