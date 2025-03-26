package com.example.project.controller;

import com.example.project.model.SocietyMembership;
import com.example.project.service.SocietyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memberships")
public class SocietyController {

    private final SocietyService societyService;

    public SocietyController(SocietyService societyService) {
        this.societyService = societyService;
    }

    @GetMapping
    public List<SocietyMembership> getAllMemberships() {
        return societyService.getAllMemberships();
    }

    @PostMapping
    public SocietyMembership createMembership(@RequestBody SocietyMembership membership) {
        return societyService.createMembership(membership);
    }

    @GetMapping("/societies/{societyName}")
    public List<SocietyMembership> getBySociety(@PathVariable String societyName) {
        return societyService.findBySociety(societyName);
    }

    @GetMapping("/students/{studentName}")
    public List<SocietyMembership> getByStudent(@PathVariable String studentName) {
        return societyService.findByStudent(studentName);
    }
}
