package com.taskmanager.service;


import com.taskmanager.dto.AddMemberRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.taskmanager.model.Project;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repo;
    private final UserRepository userRepository;

    public Project createProject(Project project) {
        return repo.save(project);
    }

    public List<Project> getAllProjects() {
        return repo.findAll();
    }

    public Project addMember(String projectId, AddMemberRequest req) {
        Project project = repo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!userRepository.existsById(req.getMemberId())) {
            throw new RuntimeException("Member user not found");
        }

        if (!project.getMembers().contains(req.getMemberId())) {
            project.getMembers().add(req.getMemberId());
        }

        return repo.save(project);
    }

    public Project updateProject(String projectId, Project updatedProject) {
        Project project = repo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());
        return repo.save(project);
    }

    public void deleteProject(String projectId) {
        if (!repo.existsById(projectId)) {
            throw new RuntimeException("Project not found");
        }
        repo.deleteById(projectId);
    }

    public Project removeMember(String projectId, String memberId) {
        Project project = repo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.getMembers().remove(memberId);
        return repo.save(project);
    }
}