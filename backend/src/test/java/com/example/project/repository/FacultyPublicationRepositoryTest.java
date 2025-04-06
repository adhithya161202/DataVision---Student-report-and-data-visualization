package com.example.project.repository;

import com.example.project.model.FacultyPublication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class FacultyPublicationRepositoryTest {

    @Autowired
    private FacultyPublicationRepository facultyPublicationRepository;

    @BeforeEach
    void setUp() {
        // Create and save sample data for testing
        FacultyPublication publication1 = new FacultyPublication(1L, "Research Paper", "Computer Science", 2023);
        FacultyPublication publication2 = new FacultyPublication(2L, "Book", "Mathematics", 2024);
        FacultyPublication publication3 = new FacultyPublication(3L, "Journal Article", "Computer Science", 2023);

        facultyPublicationRepository.save(publication1);
        facultyPublicationRepository.save(publication2);
        facultyPublicationRepository.save(publication3);
    }

    @Test
    void testFindByYear() {
        List<FacultyPublication> publications2023 = facultyPublicationRepository.findByYear(2023);
        assertThat(publications2023).hasSize(2); // Expecting 2 publications from 2023
    }

    @Test
    void testFindByDepartment() {
        List<FacultyPublication> csPublications = facultyPublicationRepository.findByDepartment("Computer Science");
        assertThat(csPublications).hasSize(2); // Expecting 2 publications in Computer Science department
    }

    @Test
    void testFindByType() {
        List<FacultyPublication> researchPapers = facultyPublicationRepository.findByType("Research Paper");
        assertThat(researchPapers).hasSize(1); // Expecting 1 publication of type 'Research Paper'
    }
}
