package com.example.project.repository;

import com.example.project.model.FacultyPublication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyPublicationRepository extends JpaRepository<FacultyPublication, Long> {

    List<FacultyPublication> findByYear(int year);

    List<FacultyPublication> findByDepartment(String department);

}
