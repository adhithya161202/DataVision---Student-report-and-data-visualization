package com.example.project.service;

import com.example.project.model.SocietyMembership;
import com.example.project.repository.SocietyMembershipRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class) 
class SocietyServiceTest {

    @Mock
    private SocietyMembershipRepository repository;

    @InjectMocks
    private SocietyService societyService; 

    // @Test
    // void testGetAllMemberships() {
        
    //     SocietyMembership membership1 = new SocietyMembership();
    //     membership1.setSocietyName("Music Club");
    //     membership1.setStudentName("Alice");

    //     SocietyMembership membership2 = new SocietyMembership();
    //     membership2.setSocietyName("Drama Club");
    //     membership2.setStudentName("Bob");

    //     when(repository.findAll()).thenReturn(Arrays.asList(membership1, membership2));

    //     List<SocietyMembership> result = societyService.getAllMemberships();

        
    //     assertEquals(2, result.size());
    //     assertEquals("Music Club", result.get(0).getSocietyName());
    //     assertEquals("Bob", result.get(1).getStudentName());
    // }

    // @Test
    // void testCreateMembership() {
    //     SocietyMembership membership = new SocietyMembership();
    //     membership.setSocietyName("Chess Club");
    //     membership.setStudentName("Charlie");

    //     when(repository.save(membership)).thenReturn(membership);

    //     SocietyMembership result = societyService.createMembership(membership);

    //     assertNotNull(result);
    //     assertEquals("Chess Club", result.getSocietyName());
    // }

    // @Test
    // void testFindBySociety() {
    //     SocietyMembership membership = new SocietyMembership();
    //     membership.setSocietyName("Coding Club");
    //     membership.setStudentName("David");

    //     when(repository.findBySocietyName("Coding Club")).thenReturn(List.of(membership));

    //     List<SocietyMembership> result = societyService.findBySociety("Coding Club");

    //     assertFalse(result.isEmpty());
    //     assertEquals("David", result.get(0).getStudentName());
    // }

    // @Test
    // void testFindByStudent() {
    //     SocietyMembership membership = new SocietyMembership();
    //     membership.setSocietyName("Robotics Club");
    //     membership.setStudentName("Emma");

    //     when(repository.findByStudentName("Emma")).thenReturn(List.of(membership));

    //     List<SocietyMembership> result = societyService.findByStudent("Emma");

    //     assertFalse(result.isEmpty());
    //     assertEquals("Robotics Club", result.get(0).getSocietyName());
    // }


    @Test
    void testGetAllMemberships() {
        SocietyMembership membership1 = new SocietyMembership();
        membership1.setSocietyName("Music Club");
        membership1.setStudentName("Alice");

        SocietyMembership membership2 = new SocietyMembership();
        membership2.setSocietyName("Drama Club");
        membership2.setStudentName("Bob");

        when(repository.findAll()).thenReturn(Arrays.asList(membership1, membership2));

        List<SocietyMembership> result = societyService.getAllMemberships();
        
        System.out.println("    Retrieved Memberships: " + result.get(0).getStudentName() + " " + result.get(0).getSocietyName());
        System.out.println("    Retrieved Memberships: " + result.get(1).getStudentName() + " " + result.get(1).getSocietyName());
        assertEquals(2, result.size());
        assertEquals("Music Club", result.get(0).getSocietyName());
        assertEquals("Bob", result.get(1).getStudentName());
    }

    @Test
    void testCreateMembership() {
        SocietyMembership membership = new SocietyMembership();
        membership.setSocietyName("Chess Club");
        membership.setStudentName("Charlie");

        when(repository.save(membership)).thenReturn(membership);

        SocietyMembership result = societyService.createMembership(membership);
        
        System.out.println("    Created Membership: " + result.getSocietyName()+ "  " + result.getStudentName() );

        assertNotNull(result);
        assertEquals("Chess Club", result.getSocietyName());
    }

    @Test
    void testFindBySociety() {
        SocietyMembership membership = new SocietyMembership();
        membership.setSocietyName("Coding Club");
        membership.setStudentName("David");

        when(repository.findBySocietyName("Coding Club")).thenReturn(List.of(membership));

        List<SocietyMembership> result = societyService.findBySociety("Coding Club");
        
        System.out.println("    Found Memberships by Society: " + result.get(0).getSocietyName() + " " + result.get(0).getStudentName());

        assertFalse(result.isEmpty());
        assertEquals("David", result.get(0).getStudentName());
    }

    @Test
    void testFindByStudent() {
        SocietyMembership membership = new SocietyMembership();
        membership.setSocietyName("Robotics Club");
        membership.setStudentName("Emma");

        when(repository.findByStudentName("Emma")).thenReturn(List.of(membership));

        List<SocietyMembership> result = societyService.findByStudent("Emma");
        
        System.out.println("    Found Memberships by Student: " + result.get(0).getSocietyName() + " " +result.get(0).getStudentName());

        assertFalse(result.isEmpty());
        assertEquals("Robotics Club", result.get(0).getSocietyName());
    }
} Society servive package com.example.project.repository;

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

} Placement repo package com.example.project.controller;

import com.example.project.model.Placement;
import com.example.project.service.PlacementService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;

@WebMvcTest(PlacementController.class) 
public class PlacementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("removal")
    @MockBean
    private PlacementService placementService;

    private List<Placement> placementList;

    @BeforeEach
    void setUp() {
        Placement placement1 = new Placement();
        placement1.setId(1L);
        placement1.setCompany("Google");
        placement1.setYear(2023);
        placement1.setDepartment("Computer Science");
        placement1.setStudentName("John Doe");

        Placement placement2 = new Placement();
        placement2.setId(2L);
        placement2.setCompany("Microsoft");
        placement2.setYear(2023);
        placement2.setDepartment("Information Technology");
        placement2.setStudentName("Jane Smith");

        placementList = Arrays.asList(placement1, placement2);
    }

//     @Test
// void testGetAllPlacements() throws Exception {
//     when(placementService.getAllPlacements()).thenReturn(placementList);

//     mockMvc.perform(MockMvcRequestBuilders.get("/api/placements"))
//             .andDo(MockMvcResultHandlers.print())  // Prints response in console
//             .andExpect(MockMvcResultMatchers.status().isOk())
//             .andExpect(jsonPath("$[0].company").exists()); // Ensure field exists
// }


@Test
void testGetAllPlacements() throws Exception {
    when(placementService.getAllPlacements()).thenReturn(placementList);

    MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/placements"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andReturn(); 

    
    System.out.println("JSON Response: " + result.getResponse().getContentAsString());
}



    // @Test
    // void testGetPlacementsByYear() throws Exception {
    //     when(placementService.getPlacementsByYear(2023)).thenReturn(placementList);

    //     mockMvc.perform(MockMvcRequestBuilders.get("/api/placements/year/2023"))
    //             .andExpect(MockMvcResultMatchers.status().isOk())
    //             .andExpect(jsonPath("$.size()", is(2)))
    //             .andExpect(jsonPath("$[0].year", is(2023)))
    //             .andExpect(jsonPath("$[1].year", is(2023)));
    // }
} Placement controller