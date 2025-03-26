package com.example.project.controller;

import com.example.project.model.Placement;
import com.example.project.service.PlacementService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    private final PlacementService placementService;

    public PlacementController(PlacementService placementService) {
        this.placementService = placementService;
    }

    // @GetMapping
    // public List<Placement> getAllPlacements() {
    //     return placementService.getAllPlacements();
    // }

    @GetMapping("/year/{year}")
    public List<Placement> getPlacementsByYear(@PathVariable int year) {
        return placementService.getPlacementsByYear(year);
    }
    @GetMapping("/all")  // Allow fetching via "/api/placements/all"
    public ResponseEntity<List<Placement>> getAllPlacements() {
        List<Placement> placements = placementService.getAllPlacements();
        return ResponseEntity.ok(placements);
    }
}
