package com.example.project.service;

import com.example.project.model.Placement;
import com.example.project.repository.PlacementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PlacementServiceTest {

    @Mock
    private PlacementRepository placementRepository;

    @InjectMocks
    private PlacementService placementService;

    private final Placement placement1 = new Placement(1, "John Doe", "Google", 2023, "Computer Science");
    private final Placement placement2 = new Placement(2, "Jane Smith", "Microsoft", 2022, "Information Technology");

    @Test
    void getAllPlacements_ShouldReturnAllPlacements() {
        // Mock repository behavior
        when(placementRepository.findAll()).thenReturn(Arrays.asList(placement1, placement2));

        // Call service method
        List<Placement> result = placementService.getAllPlacements();

        // Verify and assert
        assertEquals(2, result.size());
        assertEquals("John Doe", result.get(0).getStudentName());
        assertEquals("Jane Smith", result.get(1).getStudentName());
        verify(placementRepository, times(1)).findAll();

        // Print output for debugging
        System.out.println("All Placements: " + result.get(0).getStudentName()+ " " + result.get(1).getStudentName());
    }

    @Test
    void getPlacementsByYear_ShouldReturnPlacementsForGivenYear() {
        // Mock repository behavior
        when(placementRepository.findByYear(2023)).thenReturn(List.of(placement1));

        // Call service method
        List<Placement> result = placementService.getPlacementsByYear(2023);

        // Verify and assert
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getStudentName());
        verify(placementRepository, times(1)).findByYear(2023);

        // Print output for debugging
        // Print output for debugging
System.out.println("Placements for Year 2023: " + result.get(0).getStudentName() + " at " + result.get(0).getCompany() + " in " + result.get(0).getDepartment());

    }
}