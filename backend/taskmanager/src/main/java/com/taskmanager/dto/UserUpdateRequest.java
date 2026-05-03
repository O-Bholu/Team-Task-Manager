package com.taskmanager.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;

@Data
public class UserUpdateRequest {
    private String name;
    @Email
    private String email;
    private String password;
}
