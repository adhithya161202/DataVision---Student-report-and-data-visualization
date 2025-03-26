package com.example.project.controller;

import com.example.project.model.EventParticipation;
import com.example.project.service.EventParticipationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access this API
public class EventParticipationController {

    private final EventParticipationService service;

    public EventParticipationController(EventParticipationService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventParticipation> getAllEvents(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer year
    ) {
        return service.getFilteredEvents(department, year);
    }
    @GetMapping("/all")
    public List<EventParticipation> getAllEvents() {
        return service.getAllEvents();
    }
}
