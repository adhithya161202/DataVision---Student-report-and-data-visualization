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

    public List<EventParticipation> getFilteredEvents(String department, Integer year, String eventType,
            String eventCategory, Integer prizes_won, String prize_position) {
        if ((department == null || department.isEmpty()) && year == null &&
                (eventType == null || eventType.isEmpty()) &&
                (eventCategory == null || eventCategory.isEmpty()) &&
                prizes_won == null && (prize_position == null || prize_position.isEmpty())) {
            return repository.findAll();
        }
        if (department != null && year != null && eventType != null && eventCategory != null &&
                prizes_won != null && prize_position != null) {
            return repository.findByDepartmentAndYearAndEventTypeAndEventCategoryAndPrizesWonAndPrizePosition(
                    department, year, eventType, eventCategory, prizes_won, prize_position);
        } else if (department != null) {
            return repository.findByDepartment(department);
        } else if (eventType != null) {
            return repository.findByEventType(eventType);
        } else if (eventCategory != null) {
            return repository.findByEventCategory(eventCategory);
        } else if (prizes_won != null) {
            return repository.findByPrizesWon(prizes_won);
        } else if (prize_position != null) {
            return repository.findByPrizePosition(prize_position);
        } else {
            return repository.findByYear(year);
        }

    }

}
