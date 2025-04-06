package com.example.project.controller;

import com.example.project.model.FacultyPublication;
import com.example.project.service.FacultyPublicationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FacultyPublicationControllerTest {

    @Mock
    private FacultyPublicationService service;

    @InjectMocks
    private FacultyPublicationController controller;

    private FacultyPublication createPublication(long id, String type, int year, String department) {
        FacultyPublication publication = new FacultyPublication();
        publication.setId(id);
        publication.setType(type);
        publication.setYear(year);
        publication.setDepartment(department);
        return publication;
    }

    @Test
    void testGetAllPublications() {
        List<FacultyPublication> publications = List.of(
            createPublication(1L, "Journal", 2023, "CSE"),
            createPublication(2L, "Conference", 2024, "ECE")
        );

        when(service.getAllPublications()).thenReturn(publications);

        List<FacultyPublication> result = controller.getAllPublications();
        assertEquals(2, result.size());
        assertEquals("Journal", result.get(0).getType());
        assertEquals("Conference", result.get(1).getType());
    }

    @Test
    void testGetPublicationsByYear() {
        int year = 2023;
        FacultyPublication publication = createPublication(1L, "Journal", year, "CSE");

        when(service.getPublicationsByYear(year)).thenReturn(List.of(publication));

        List<FacultyPublication> result = controller.getPublicationsByYear(year);
        assertEquals(1, result.size());
        assertEquals(year, result.get(0).getYear());
    }

    @Test
    void testGetPublicationsByDepartment() {
        String department = "CSE";
        FacultyPublication publication = createPublication(1L, "Conference", 2022, department);

        when(service.getPublicationsByDepartment(department)).thenReturn(List.of(publication));

        List<FacultyPublication> result = controller.getPublicationsByDepartment(department);
        assertEquals(1, result.size());
        assertEquals(department, result.get(0).getDepartment());
    }

    @Test
    void testGetPublicationsByType() {
        String type = "Journal";
        FacultyPublication publication = createPublication(1L, type, 2021, "ECE");

        when(service.getPublicationsByType(type)).thenReturn(List.of(publication));

        List<FacultyPublication> result = controller.getPublicationsByType(type);
        assertEquals(1, result.size());
        assertEquals(type, result.get(0).getType());
    }
}
