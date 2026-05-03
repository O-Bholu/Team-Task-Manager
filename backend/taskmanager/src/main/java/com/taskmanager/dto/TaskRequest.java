package com.taskmanager.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class TaskRequest {
	@NotBlank
	private String title;

	private String description;

	private String assignedTo;

	@NotBlank
	private String projectId;

	private Date dueDate;
}
