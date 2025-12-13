package com.personalspa.personalpage.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.personalspa.personalpage.entities.Project;

public interface IProjectService {
    Optional<Project> findById(Long id);
    Project save(Project project);
    List<Project> findAll();
    Project updateProject(Project project);
    void deleteById(Long id);
}
