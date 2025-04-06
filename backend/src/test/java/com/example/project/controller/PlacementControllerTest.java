package com.example.project.controller;

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
}