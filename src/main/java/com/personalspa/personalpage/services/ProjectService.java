package com.personalspa.personalpage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.Project;
import com.personalspa.personalpage.repositories.ProjectRepo;
import com.personalspa.personalpage.services.interfaces.IProjectService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProjectService implements IProjectService{
    @Autowired
    private ProjectRepo projectRepo;

    @Override
    public Optional<Project> findById(Long id) {
        return projectRepo.findById(id);
    }  
    @Override
    public Project save(Project project) {
        return projectRepo.save(project);
    }               
    @Override
    public List<Project> findAll() {
        return projectRepo.findAll();
    }
    @Override
    public Project updateProject(Long id, Project project) {    
        Project thisProject = projectRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));
        
        thisProject.setName(project.getName());
        thisProject.setPhoto(project.getPhoto());
        thisProject.setProject(project.getProject());
        thisProject.setState(project.getState());
        thisProject.setTechnology(project.getTechnology());

        return projectRepo.save(thisProject);
    }
    @Override
    public void deleteById(Long id) {
        projectRepo.deleteById(id); 
    }
}
