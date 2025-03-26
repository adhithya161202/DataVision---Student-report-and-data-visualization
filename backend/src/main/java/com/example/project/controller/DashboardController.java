package com.example.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping
    public ResponseEntity<?> getDashboard() {
        // This is just an example; replace with actual logic
        return ResponseEntity.ok("Welcome to the dashboard!");
    }
}
