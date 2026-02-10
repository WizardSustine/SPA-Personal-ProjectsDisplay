package com.personalspa.personalpage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.Project;
import com.personalspa.personalpage.repositories.ProjectRepo;
import com.personalspa.personalpage.services.interfaces.IProjectService;

import jakarta.transaction.Transactional;

/**
 * Servicio de negocio que implementa las operaciones CRUD para proyectos.
 * Encapsula la logica de negocio y delega persistencia al repositorio.
 */
@Service
@Transactional
public class ProjectService implements IProjectService{
    @Autowired
    private ProjectRepo projectRepo;

    // Busca un proyecto por ID
    @Override
    public Optional<Project> findById(Long id) {
        return projectRepo.findById(id);
    }  
    // Guarda un nuevo proyecto en la base de datos
    @Override
    public Project save(Project project) {
        return projectRepo.save(project);
    }               
    // Retorna todos los proyectos 
    @Override
    public List<Project> findAll() {
        return projectRepo.findAll();
    }
    /** Actualiza los campos de un proyecto existente */
    @Override
    public Project updateProject(Long id, Project project) {    
        Project thisProject = projectRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));
        
        thisProject.setTitle(project.getTitle());
        thisProject.setDescription(project.getDescription());
        thisProject.setImageUrl(project.getImageUrl());
        thisProject.setIsPublic(project.getIsPublic());
        thisProject.setTechnology(project.getTechnology());
        thisProject.setArgument(project.getArgument());
        thisProject.setAttributes(project.getAttributes());
        thisProject.setDocsUrl(project.getDocsUrl());
        thisProject.setReadmeUrl(project.getReadmeUrl());
        thisProject.setRepoUrl(project.getRepoUrl());
        thisProject.setLiveUrl(project.getLiveUrl());

        return projectRepo.save(thisProject);
    }
    /** Elimina un proyecto por su ID */
    @Override
    public void deleteById(Long id) {
        projectRepo.deleteById(id); 
    }
}