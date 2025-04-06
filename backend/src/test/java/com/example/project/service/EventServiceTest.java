package com.example.project.service;

public class EventService {
    
}
package com.example.project.service;

import com.example.project.model.EventParticipation;
import com.example.project.repository.EventParticipationRepository;
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
class EventParticipationServiceTest {

    @Mock
    private EventParticipationRepository repository;

    @InjectMocks
    private EventParticipationService service;

    private final EventParticipation event1 =
            new EventParticipation(1, "John Doe", "Tech Fest", 2023, 
                                   "Computer Science", "Technical", 
                                   "Hackathon", 1, "First");

    private final EventParticipation event2 =
            new EventParticipation(2, "Jane Smith", "Dance Competition", 2022, 
                                   "Arts", "Cultural", 
                                   "Competition", 0, null);

   @Test
   void getAllEvents_ShouldReturnAllEvents() {
       // Print test setup information
       System.out.println("=== Testing getAllEvents_ShouldReturnAllEvents ===");
       System.out.println("Setting up mock repository to return 2 events");
       
       // Set up mock behavior
       when(repository.findAll()).thenReturn(Arrays.asList(event1, event2));
       
       // Print expected data
       System.out.println("\nExpected events:");
       System.out.println("Event 1: " + event1.getStudentName() + ", " + event1.getEventName() + 
                         ", Dept: " + event1.getDepartment() + ", Type: " + event1.getEventType());
       System.out.println("Event 2: " + event2.getStudentName() + ", " + event2.getEventName() + 
                         ", Dept: " + event2.getDepartment() + ", Type: " + event2.getEventType());
       
       // Call the service method
       System.out.println("\nCalling service.getAllEvents()...");
       List<EventParticipation> result = service.getAllEvents();
       
       // Print actual result
       System.out.println("\nActual result returned from service:");
       System.out.println("Result size: " + result.size());
       if (result.size() > 0) {
           System.out.println("Result Event 1: " + result.get(0).getStudentName() + 
                             ", " + result.get(0).getEventName() + 
                             ", Dept: " + result.get(0).getDepartment());
           if (result.size() > 1) {
               System.out.println("Result Event 2: " + result.get(1).getStudentName() + 
                                 ", " + result.get(1).getEventName() + 
                                 ", Dept: " + result.get(1).getDepartment());
           }
       } else {
           System.out.println("No events returned from service!");
       }
       
       // Assert and verify
       assertEquals(2, result.size(), "Should return 2 events");
       System.out.println("\nAssertion passed: result size is 2");
       
       verify(repository, times(1)).findAll();
       System.out.println("Verification passed: repository.findAll() was called exactly once");
       System.out.println("=== Test completed successfully ===");
   }
}