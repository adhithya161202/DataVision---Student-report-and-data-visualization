package com.example.project.repository;

import com.example.project.model.Placement;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest  
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PlacementRepositoryTest {

    @Autowired
    private PlacementRepository placementRepository;

    @SuppressWarnings("unused")
    private Placement placement1, placement2, placement3;

    @BeforeEach
    void setUp() {
        placementRepository.deleteAll();
    
        Placement placement1 = new Placement();
        placement1.setCompany("Google");
        placement1.setYear(2023);
        placement1.setDepartment("Computer Science");
        placement1.setStudentName("John Doe");
    
        Placement placement2 = new Placement();
        placement2.setCompany("Microsoft");
        placement2.setYear(2023); 
        placement2.setDepartment("Information Technology");
        placement2.setStudentName("Jane Smith");
    
        Placement placement3 = new Placement();
        placement3.setCompany("Amazon");
        placement3.setYear(2024); 
        placement3.setDepartment("Electronics");
        placement3.setStudentName("Alice Johnson");
    
        placementRepository.save(placement1);
        placementRepository.save(placement2);
        placementRepository.save(placement3);
    }
    



    @Test
    void testFindByYear() {
        List<Placement> placements = placementRepository.findByYear(2023);
    
        
        System.out.println("Placements found for 2023: " + placements.size());

        assertEquals(2, placements.size(), "Should return 2 placements for year 2023");
}

}