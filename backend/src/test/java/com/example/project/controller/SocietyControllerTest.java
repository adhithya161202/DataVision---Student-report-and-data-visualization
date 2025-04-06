package com.example.project.controller;

import com.example.project.model.SocietyMembership;
import com.example.project.service.SocietyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest(SocietyController.class)
class SocietyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SocietyService societyService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllMemberships_ShouldReturnAllMemberships() throws Exception {
        System.out.println("\n====== STARTING TEST: getAllMemberships_ShouldReturnAllMemberships ======");
        
        // Mock data
        SocietyMembership membership1 = new SocietyMembership((long) 1, "John Doe", "Tech Society");
        SocietyMembership membership2 = new SocietyMembership((long) 2, "Jane Smith", "Art Society");
        List<SocietyMembership> memberships = Arrays.asList(membership1, membership2);
        
        System.out.println("Created mock data:");
        System.out.println("- Membership 1: " + membership1.getStudentName() + " in " + membership1.getSocietyName());
        System.out.println("- Membership 2: " + membership2.getStudentName() + " in " + membership2.getSocietyName());

        // Mock service behavior
        System.out.println("Setting up mock service behavior for getAllMemberships()");
        when(societyService.getAllMemberships()).thenReturn(memberships);

        // Perform GET request and verify response
        System.out.println("Executing GET request to /api/memberships");
        MvcResult result = mockMvc.perform(get("/api/memberships"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].studentName").value("John Doe"))
                .andExpect(jsonPath("$[1].societyName").value("Art Society"))
                .andReturn();
        
        System.out.println("Response body: " + result.getResponse().getContentAsString());
        System.out.println("====== FINISHED TEST: getAllMemberships_ShouldReturnAllMemberships ======\n");
    }

    @Test
    void createMembership_ShouldReturnCreatedMembership() throws Exception {
        System.out.println("\n====== STARTING TEST: createMembership_ShouldReturnCreatedMembership ======");
        
        // Mock input and output data
        SocietyMembership membership = new SocietyMembership(null, "Alice Johnson", "Music Society");
        SocietyMembership savedMembership = new SocietyMembership((long) 3, "Alice Johnson", "Music Society");
        
        System.out.println("Created mock data:");
        System.out.println("- Input Membership: " + membership.getStudentName() + " in " + membership.getSocietyName());
        System.out.println("- Saved Membership: ID=" + savedMembership.getId() + ", " + 
                          savedMembership.getStudentName() + " in " + savedMembership.getSocietyName());

        // Mock service behavior - use any() matcher for flexibility
        System.out.println("Setting up mock service behavior for createMembership()");
        when(societyService.createMembership(any(SocietyMembership.class))).thenReturn(savedMembership);

        // Convert input to JSON
        String inputJson = objectMapper.writeValueAsString(membership);
        System.out.println("Input JSON: " + inputJson);
        
        // Perform POST request and verify response
        System.out.println("Executing POST request to /api/memberships");
        MvcResult result = mockMvc.perform(post("/api/memberships")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputJson))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.studentName").value("Alice Johnson"))
                .andExpect(jsonPath("$.societyName").value("Music Society"))
                .andReturn();
        
        System.out.println("Response body: " + result.getResponse().getContentAsString());
        System.out.println("====== FINISHED TEST: createMembership_ShouldReturnCreatedMembership ======\n");
    }

    @Test
    void getBySociety_ShouldReturnMembersOfSociety() throws Exception {
        System.out.println("\n====== STARTING TEST: getBySociety_ShouldReturnMembersOfSociety ======");
        
        // Mock data
        SocietyMembership membership1 = new SocietyMembership(1L, "John Doe", "Tech Society");
        SocietyMembership membership2 = new SocietyMembership(2L, "Jane Smith", "Tech Society");
        List<SocietyMembership> memberships = Arrays.asList(membership1, membership2);
        
        System.out.println("Created mock data for Tech Society:");
        System.out.println("- Member 1: " + membership1.getStudentName());
        System.out.println("- Member 2: " + membership2.getStudentName());

        // Mock service behavior - use any() matcher
        System.out.println("Setting up mock service behavior for findBySociety()");
        when(societyService.findBySociety(any(String.class))).thenReturn(memberships);

        // Perform GET request and verify response
        String societyName = "Tech Society";
        System.out.println("Executing GET request to /api/memberships/societies/" + societyName);
        MvcResult result = mockMvc.perform(get("/api/memberships/societies/{societyName}", societyName))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].studentName").value("John Doe"))
                .andExpect(jsonPath("$[1].studentName").value("Jane Smith"))
                .andReturn();
        
        System.out.println("Response body: " + result.getResponse().getContentAsString());
        System.out.println("====== FINISHED TEST: getBySociety_ShouldReturnMembersOfSociety ======\n");
    }

    @Test
    void getByStudent_ShouldReturnStudentSocieties() throws Exception {
        System.out.println("\n====== STARTING TEST: getByStudent_ShouldReturnStudentSocieties ======");
        
        // Mock data
        SocietyMembership membership1 = new SocietyMembership(1L, "John Doe", "Tech Society");
        List<SocietyMembership> memberships = List.of(membership1);
        
        System.out.println("Created mock data for student John Doe:");
        System.out.println("- Society: " + membership1.getSocietyName());

        // Mock service behavior - use any() matcher
        System.out.println("Setting up mock service behavior for findByStudent()");
        when(societyService.findByStudent(any(String.class))).thenReturn(memberships);

        // Perform GET request and verify response
        String studentName = "John Doe";
        System.out.println("Executing GET request to /api/memberships/students/" + studentName);
        MvcResult result = mockMvc.perform(get("/api/memberships/students/{studentName}", studentName))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].societyName").value("Tech Society"))
                .andReturn();
        
        System.out.println("Response body: " + result.getResponse().getContentAsString());
        System.out.println("====== FINISHED TEST: getByStudent_ShouldReturnStudentSocieties ======\n");
    }
}