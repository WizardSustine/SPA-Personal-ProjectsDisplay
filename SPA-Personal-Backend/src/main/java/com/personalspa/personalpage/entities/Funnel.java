package com.personalspa.personalpage.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "funnel")
public class Funnel {
    @Id
    private String id;
    private Long createdAt;
    private Long endAt;
    @Column(columnDefinition = "MEDIUMTEXT")
    private List<String> visitorPaths;

    public Funnel() {}
    public Funnel(String id, Long createdAt, Long endAt, List<String> visitorPaths) {
        this.id = id;
        this.createdAt = createdAt;
        this.endAt = endAt;
        this.visitorPaths = visitorPaths;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public Long getEndAt() {
        return endAt;
    }

    public void setEndAt(Long endAt) {
        this.endAt = endAt;
    }

    public List<String> getVisitorPaths() {
        return visitorPaths;
    }

    public void setVisitorPaths(List<String> visitorPaths) {
        this.visitorPaths = visitorPaths;
    }
}