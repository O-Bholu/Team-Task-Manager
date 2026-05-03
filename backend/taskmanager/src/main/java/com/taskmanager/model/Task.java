package com.taskmanager.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    private String id;

    private String title;
    private String description;

    private TaskStatus status; // Values: TODO, IN_PROGRESS, DONE

    private String assignedTo; // userId
    private String projectId;

    private Date dueDate;
}