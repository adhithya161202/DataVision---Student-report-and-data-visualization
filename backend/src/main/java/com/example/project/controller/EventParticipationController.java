package com.example.project.controller;

import com.example.project.model.EventParticipation;
import com.example.project.service.EventParticipationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000") 
public class EventParticipationController {

    private final EventParticipationService service;

    public EventParticipationController(EventParticipationService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventParticipation> getAllEvents(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String eventCategory,
            @RequestParam(required = false) Integer prizesWon,
            @RequestParam(required = false) String prizePosition
            
    ) {
        return service.getFilteredEvents(department, year, eventType, eventCategory, prizesWon, prizePosition);
    }
    @GetMapping("/all")
    public List<EventParticipation> getAllEvents() {
        return service.getAllEvents();
    }
}
