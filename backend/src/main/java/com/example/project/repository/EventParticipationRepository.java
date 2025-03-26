package com.example.project.repository;

import com.example.project.model.EventParticipation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventParticipationRepository extends JpaRepository<EventParticipation, Integer> {

    List<EventParticipation> findByDepartment(String department);

    List<EventParticipation> findByYear(Integer year);

    List<EventParticipation> findByDepartmentAndYear(String department, Integer year);
}
