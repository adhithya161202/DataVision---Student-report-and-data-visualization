package com.example.project.service;

import com.example.project.model.FacultyPublication;
import com.example.project.repository.FacultyPublicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyPublicationService {

    private final FacultyPublicationRepository repository;

    public FacultyPublicationService(FacultyPublicationRepository repository) {
        this.repository = repository;
    }

    public List<FacultyPublication> getAllPublications() {
        return repository.findAll();
    }

    public List<FacultyPublication> getPublicationsByYear(int year) {
        return repository.findByYear(year);
    }

    public List<FacultyPublication> getPublicationsByDepartment(String department) {
        return repository.findByDepartment(department);
    }
}
