package com.example.project.repository;

import com.example.project.model.SocietyMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SocietyMembershipRepository 
        extends JpaRepository<SocietyMembership, Long> {

    List<SocietyMembership> findBySocietyName(String societyName);
    
    List<SocietyMembership> findByStudentName(String studentName);
}
