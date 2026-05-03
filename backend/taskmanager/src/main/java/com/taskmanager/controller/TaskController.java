package com.taskmanager.controller;

import com.taskmanager.dto.DashboardResponse;
import com.taskmanager.dto.TaskRequest;
import com.taskmanager.model.Task;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Task> create(@Valid @RequestBody TaskRequest req) {
        Task t = Task.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .assignedTo(req.getAssignedTo())
                .projectId(req.getProjectId())
                .dueDate(req.getDueDate())
                .build();

        return ResponseEntity.ok(service.createTask(t));
    }

    @PutMapping("/{id}/details")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @Valid @RequestBody TaskRequest req) {
        Task updated = Task.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .assignedTo(req.getAssignedTo())
                .dueDate(req.getDueDate())
                .build();
        return ResponseEntity.ok(service.updateTask(id, updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        service.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable String id, @RequestParam TaskStatus status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<List<Task>> getByProject(@PathVariable String id) {
        return ResponseEntity.ok(service.getTasksByProject(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks(org.springframework.security.core.Authentication authentication) {
        com.taskmanager.model.User user = (com.taskmanager.model.User) authentication.getPrincipal();
        return ResponseEntity.ok(service.getAllTasksForUser(user.getId(), user.getRole()));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> dashboard() {
        return ResponseEntity.ok(service.getDashboardSummary());
    }
}