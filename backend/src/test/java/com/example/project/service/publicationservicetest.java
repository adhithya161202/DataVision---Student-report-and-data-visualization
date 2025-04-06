package com.example.project.service;

import com.example.project.model.FacultyPublication;
import com.example.project.repository.FacultyPublicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class FacultyPublicationServiceTest {

    private FacultyPublicationRepository repository;
    private FacultyPublicationService service;

    @BeforeEach
    void setUp() {
        repository = Mockito.mock(FacultyPublicationRepository.class); // Mock the repository
        service = new FacultyPublicationService(repository); // Inject the mock into the service
    }

    @Test
    void testGetAllPublications() {
        // Arrange: Mock repository behavior
        List<FacultyPublication> mockPublications = Arrays.asList(
            new FacultyPublication(1L, "Research Paper", "Computer Science", 2023),
            new FacultyPublication(2L, "Book", "Mathematics", 2024)
        );
        when(repository.findAll()).thenReturn(mockPublications);

        // Act: Call the service method
        List<FacultyPublication> result = service.getAllPublications();

        // Print result for verification
        System.out.println("testGetAllPublications result: " + result.get(0).getDepartment() + " " + result.get(1).getDepartment());

        // Assert: Verify results and interactions
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getType()).isEqualTo("Research Paper");
        verify(repository, times(1)).findAll();
    }

    @Test
    void testGetPublicationsByYear() {
        // Arrange: Mock repository behavior
        List<FacultyPublication> mockPublications = Arrays.asList(
            new FacultyPublication(1L, "Research Paper", "Computer Science", 2023),
            new FacultyPublication(2L, "Journal Article", "Physics", 2023)
        );
        when(repository.findByYear(2023)).thenReturn(mockPublications);

        // Act: Call the service method
        List<FacultyPublication> result = service.getPublicationsByYear(2023);

        // Print result for verification
        System.out.println("testGetPublicationsByYear result: " + result);

        // Assert: Verify results and interactions
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getYear()).isEqualTo(2023);
        verify(repository, times(1)).findByYear(2023);
    }

    @Test
    void testGetPublicationsByDepartment() {
        // Arrange: Mock repository behavior
        List<FacultyPublication> mockPublications = Arrays.asList(
            new FacultyPublication(1L, "Research Paper", "Computer Science", 2023),
            new FacultyPublication(2L, "Journal Article", "Computer Science", 2024)
        );
        when(repository.findByDepartment("Computer Science")).thenReturn(mockPublications);

        // Act: Call the service method
        List<FacultyPublication> result = service.getPublicationsByDepartment("Computer Science");

        // Print result for verification
        System.out.println("testGetPublicationsByDepartment result: " + result);

        // Assert: Verify results and interactions
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getDepartment()).isEqualTo("Computer Science");
        verify(repository, times(1)).findByDepartment("Computer Science");
    }

    @Test
    void testGetPublicationsByType() {
        // Arrange: Mock repository behavior
        List<FacultyPublication> mockPublications = Arrays.asList(
            new FacultyPublication(1L, "Research Paper", "Computer Science", 2023),
            new FacultyPublication(2L, "Research Paper", "Physics", 2024)
        );
        when(repository.findByType("Research Paper")).thenReturn(mockPublications);

        // Act: Call the service method
        List<FacultyPublication> result = service.getPublicationsByType("Research Paper");

        // Print result for verification
        System.out.println("testGetPublicationsByType result: " + result);

        // Assert: Verify results and interactions
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getType()).isEqualTo("Research Paper");
        verify(repository, times(1)).findByType("Research Paper");
    }
}
