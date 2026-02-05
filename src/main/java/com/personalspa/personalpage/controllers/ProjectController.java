package com.personalspa.personalpage.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.web.bind.annotation.CrossOrigin;*/
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalspa.personalpage.handlers.ProjectNotFoundException;

import com.personalspa.personalpage.entities.Project;
import com.personalspa.personalpage.services.ProjectService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

    @GetMapping("/projects/{id}")
    public Project getProjectById(@RequestParam Long id) {
        return projectService.findById(id)
            .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @GetMapping("/projects/all")
    public List<Project> getAll () {
        return projectService.findAll();
    }

    @PostMapping("/project/save")
    Project newProject(@RequestBody Project newProject) {
        return projectService.save(newProject);
    }

    @PutMapping("/project/update/{id}")
    Project replaceProject(@RequestBody Project newProject, @RequestParam Long id) {

        return projectService.findById(id)
            .map(project -> {
                project.setName(newProject.getName());
                return projectService.save(project);
            })
            .orElseGet(() -> {
                newProject.setId(id);
                return projectService.save(newProject);
            });
    }

    @DeleteMapping("/project/delete/{id}")
    public void deleteProject(@RequestParam Long id) {
        projectService.deleteById(id);
    }

}
