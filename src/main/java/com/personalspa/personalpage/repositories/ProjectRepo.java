package com.personalspa.personalpage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.personalspa.personalpage.entities.Project;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {
}