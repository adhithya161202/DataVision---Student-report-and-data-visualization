package com.example.project.repository;

import com.example.project.model.EventParticipation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventParticipationRepository extends JpaRepository<EventParticipation, Integer> {

    List<EventParticipation> findByDepartment(String department);

    List<EventParticipation> findByYear(Integer year);

    List<EventParticipation> findByEventType(String eventType);

    List<EventParticipation> findByEventCategory(String eventCategory);

    List<EventParticipation> findByPrizesWon(Integer prizesWon); // Updated field name

    List<EventParticipation> findByPrizePosition(String prizePosition); // Updated field name

    List<EventParticipation> findByDepartmentAndYearAndEventTypeAndEventCategoryAndPrizesWonAndPrizePosition(
    String department, Integer year, String eventType, String eventCategory, Integer prizesWon, String prizePosition);

}
