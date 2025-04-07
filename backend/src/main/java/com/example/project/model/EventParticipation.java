
package com.example.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_participation")
public class EventParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "event_category", nullable = false)
    private String eventCategory;

    @Column(name = "prizesWon")
    private Integer prizesWon;
    
    @Column(name = "prizePosition")
    private String prizePosition;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public void setEventCategory(String eventCategory) {
        this.eventCategory = eventCategory;
    }

    public String getEventCategory() {
        return eventCategory;
    }

    public Integer getpricesWon() {
        return prizesWon;
    }

    public void setpricesWon(Integer pricesWon) {
        this.prizesWon = pricesWon;
    }

    public String getPrize_position() {
        return prizePosition;
    }

    public void setPrize_position(String prize_position) {
        this.prizePosition = prize_position;
    }
}
