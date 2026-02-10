package com.personalspa.personalpage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.Funnel;
import com.personalspa.personalpage.entities.Project;
import com.personalspa.personalpage.repositories.FunnelRepo;

import jakarta.transaction.Transactional;

/**
 * Servicio de negocio para gestion del funnel de conversion.
 * Analiza rutas de navegacion de visitantes.
 */
@Service
@Transactional
public class FunnelService {

    @Autowired
    private FunnelRepo funnelRepo;


    /** Busca un funnel por ID de sesion */
    public Optional<Funnel> findById(String id) {
        return funnelRepo.findById(id);
    }  

    /** Guarda un nuevo funnel */
    public Funnel save(Funnel funnel) {
        return funnelRepo.save(funnel);
    }               
    
    /** Retorna todos los funnels registrados */
    public List<Funnel> findAll() {
        return funnelRepo.findAll();
    }
    
    /** Elimina un funnel por su ID */
    public void deleteById(String id) {
        funnelRepo.deleteById(id); 
    }
}
