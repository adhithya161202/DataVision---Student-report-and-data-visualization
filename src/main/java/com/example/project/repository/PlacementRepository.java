package com.example.project.repository;

import com.example.project.model.Placement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlacementRepository extends JpaRepository<Placement, Long> {
    List<Placement> findByYear(int year); // To filter by year
}
