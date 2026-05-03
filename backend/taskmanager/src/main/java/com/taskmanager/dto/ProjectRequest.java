package com.taskmanager.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;

@Data
public class ProjectRequest {
    @NotBlank
    private String name;

    private String description;
}
