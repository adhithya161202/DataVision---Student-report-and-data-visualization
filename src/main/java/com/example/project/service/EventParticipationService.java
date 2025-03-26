package com.example.project.service;

import com.example.project.model.EventParticipation;
import com.example.project.repository.EventParticipationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventParticipationService {

    private final EventParticipationRepository repository;

    public EventParticipationService(EventParticipationRepository repository) {
        this.repository = repository;
    }

    public List<EventParticipation> getAllEvents() {
        return repository.findAll();
    }

    public List<EventParticipation> getFilteredEvents(String department, Integer year) {
        if (department == null && year == null) {
            return repository.findAll();
        } else if (department != null && year != null) {
            return repository.findByDepartmentAndYear(department, year);
        } else if (department != null) {
            return repository.findByDepartment(department);
        } else {
            return repository.findByYear(year);
        }
    }

    
}
