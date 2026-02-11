package com.personalspa.personalpage.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.personalspa.personalpage.handlers.ProjectNotFoundException;

import com.personalspa.personalpage.entities.Project;
import com.personalspa.personalpage.services.ProjectService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

    /** Obtiene un proyecto por su ID. Acceso publico. */
    @GetMapping("/projects/{id}")
    public Project getProjectById(@PathVariable  Long id) {
        return projectService.findById(id)
            .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    /** Obtiene todos los proyectos. Acceso publico. */
    @GetMapping("/projects/all")
    public List<Project> getAll () {
        return projectService.findAll();
    }

    /** Crea un nuevo proyecto. Requiere rol ADMIN o MASTER. */
    @PreAuthorize("hasAnyRole('ADMIN','MASTER')")
    @PostMapping("/project/save")
    public Project newProject(@RequestBody Project newProject) {
        System.out.println("acá intento guardar un proyecto");
        return projectService.save(newProject);
    }

    /** Actualiza un proyecto existente. Requiere rol ADMIN o MASTER. */
    @PreAuthorize("hasAnyRole('ADMIN','MASTER')")
    @PutMapping("/project/update/{id}")
    Project udpateProject(@RequestBody Project newProject, @PathVariable Long id) {
        return projectService.updateProject(id, newProject);
    }

    /** Elimina un proyecto. Requiere rol ADMIN o MASTER. */
    @PreAuthorize("hasAnyRole('ADMIN','MASTER')")
    @DeleteMapping("/project/delete/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteById(id);
    }

}
