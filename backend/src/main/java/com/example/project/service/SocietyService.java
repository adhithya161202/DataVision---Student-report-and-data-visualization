package com.example.project.service;

import com.example.project.model.SocietyMembership;
import com.example.project.repository.SocietyMembershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocietyService {

    private final SocietyMembershipRepository repository;

    public SocietyService(SocietyMembershipRepository repository) {
        this.repository = repository;
    }

    public List<SocietyMembership> getAllMemberships() {
        return repository.findAll();
    }

    public SocietyMembership createMembership(SocietyMembership membership) {
        return repository.save(membership);
    }
    
    public List<SocietyMembership> findBySociety(String societyName) {
        return repository.findBySocietyName(societyName);
    }
    
    public List<SocietyMembership> findByStudent(String studentName) {
        return repository.findByStudentName(studentName);
    }
}
