package com.example.project.controller;

import com.example.project.model.FacultyPublication;
import com.example.project.service.FacultyPublicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access this API
public class FacultyPublicationController {

    private final FacultyPublicationService service;

    public FacultyPublicationController(FacultyPublicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<FacultyPublication> getAllPublications() {
        return service.getAllPublications();
    }

    @GetMapping("/year/{year}")
    public List<FacultyPublication> getPublicationsByYear(@PathVariable int year) {
        return service.getPublicationsByYear(year);
    }

    @GetMapping("/department/{department}")
    public List<FacultyPublication> getPublicationsByDepartment(@PathVariable String department) {
        return service.getPublicationsByDepartment(department);
    }
}
