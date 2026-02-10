package com.personalspa.personalpage.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.personalspa.personalpage.entities.Project;

/**
 * Interfaz que define el contrato de servicios para operaciones CRUD de proyectos.
 * Implementada por ProjectService. Facilita inyeccion de dependencias y testing.
 */
public interface IProjectService {
    /** Busca un proyecto por su ID */
    Optional<Project> findById(Long id);
    /** Guarda un nuevo proyecto o actualiza uno existente */
    Project save(Project project);
    /** Retorna todas los proyectos */
    List<Project> findAll();
    /** Actualiza un proyecto existente manteniendo su integridad */
    Project updateProject(Long id, Project project);
    /** Elimina un proyecto por su ID */
    void deleteById(Long id);
}
