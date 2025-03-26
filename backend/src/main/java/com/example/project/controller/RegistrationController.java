package com.example.project.controller;

import com.example.project.model.User;
import com.example.project.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class RegistrationController {

    private final UserRepository userRepository;

    public RegistrationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // @PostMapping("/register")
    // public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest
    // request) {
    // if (userRepository.existsByEmail(request.getEmail())) {
    // return ResponseEntity.badRequest().body("Email already exists");
    // }

    // if (userRepository.existsByUsername(request.getUsername())) {
    // return ResponseEntity.badRequest().body("Username already exists");
    // }

    // User user = new User();
    // user.setFirstName(request.getFirstName());
    // user.setLastName(request.getLastName());
    // user.setEmail(request.getEmail());
    // user.setUsername(request.getUsername());
    // user.setPassword(request.getPassword());
    // user.setTermsAgreed(request.isTermsAgreed());

    // userRepository.save(user);

    // return ResponseEntity.ok("User registered successfully");
    // }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            if (userRepository.existsByUsername(request.getUsername())) {
                return ResponseEntity.badRequest().body("Username already exists");
            }

            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword());
            user.setTermsAgreed(request.isTermsAgreed());

            userRepository.save(user);

            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Find user by username or email
            User user = userRepository
                    .findByUsernameOrEmail(loginRequest.getUsernameOrEmail(), loginRequest.getUsernameOrEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid username/email or password"));

            // Validate password
            if (!user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.status(401).body("Invalid username/email or password");
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("email", user.getEmail());

            // Return success message
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

}
