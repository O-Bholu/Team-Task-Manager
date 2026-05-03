package com.taskmanager.controller;

import com.taskmanager.dto.UserDto;
import com.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream()
                .map(u -> UserDto.builder()
                        .id(u.getId())
                        .name(u.getName())
                        .email(u.getEmail())
                        .role(u.getRole())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteUser(@org.springframework.web.bind.annotation.PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @org.springframework.web.bind.annotation.PutMapping("/me")
    public ResponseEntity<UserDto> updateProfile(
            org.springframework.security.core.Authentication authentication,
            @org.springframework.web.bind.annotation.RequestBody com.taskmanager.dto.UserUpdateRequest req,
            @org.springframework.beans.factory.annotation.Autowired org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder encoder) {
        
        com.taskmanager.model.User user = (com.taskmanager.model.User) authentication.getPrincipal();
        com.taskmanager.model.User dbUser = userRepository.findById(user.getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (req.getName() != null && !req.getName().isEmpty()) dbUser.setName(req.getName());
        if (req.getEmail() != null && !req.getEmail().isEmpty()) dbUser.setEmail(req.getEmail());
        if (req.getPassword() != null && !req.getPassword().isEmpty()) dbUser.setPassword(encoder.encode(req.getPassword()));

        userRepository.save(dbUser);
        
        return ResponseEntity.ok(UserDto.builder()
                .id(dbUser.getId())
                .name(dbUser.getName())
                .email(dbUser.getEmail())
                .role(dbUser.getRole())
                .build());
    }
}
