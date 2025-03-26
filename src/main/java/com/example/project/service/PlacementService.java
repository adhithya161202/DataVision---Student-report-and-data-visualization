package com.example.project.service;

import com.example.project.model.Placement;
import com.example.project.repository.PlacementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacementService {

    private final PlacementRepository placementRepository;

    public PlacementService(PlacementRepository placementRepository) {
        this.placementRepository = placementRepository;
    }

    public List<Placement> getAllPlacements() {
        return placementRepository.findAll();
    }

    public List<Placement> getPlacementsByYear(int year) {
        return placementRepository.findByYear(year);
    }
}
