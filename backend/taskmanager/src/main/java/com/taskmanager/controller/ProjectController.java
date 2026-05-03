package com.taskmanager.controller;

import com.taskmanager.dto.AddMemberRequest;
import com.taskmanager.dto.ProjectRequest;
import com.taskmanager.model.Project;
import com.taskmanager.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Project> create(@Valid @RequestBody ProjectRequest req, Principal principal) {
        Project p = Project.builder()
                .name(req.getName())
                .description(req.getDescription())
                .createdBy(principal.getName())
                .build();

        return ResponseEntity.ok(service.createProject(p));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAll() {
        return ResponseEntity.ok(service.getAllProjects());
    }

    @PostMapping("/{id}/members")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Project> addMember(@PathVariable String id, @Valid @RequestBody AddMemberRequest req) {
        return ResponseEntity.ok(service.addMember(id, req));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @Valid @RequestBody ProjectRequest req) {
        Project updated = Project.builder()
                .name(req.getName())
                .description(req.getDescription())
                .build();
        return ResponseEntity.ok(service.updateProject(id, updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        service.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/members/{memberId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Project> removeMember(@PathVariable String id, @PathVariable String memberId) {
        return ResponseEntity.ok(service.removeMember(id, memberId));
    }
}