package com.personalspa.personalpage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.Funnel;
import com.personalspa.personalpage.entities.Project;
import com.personalspa.personalpage.repositories.FunnelRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FunnelService {

    @Autowired
    private FunnelRepo funnelRepo;


    public Optional<Funnel> findById(String id) {
        return funnelRepo.findById(id);
    }  

    public Funnel save(Funnel funnel) {
        return funnelRepo.save(funnel);
    }               
    
    public List<Funnel> findAll() {
        return funnelRepo.findAll();
    }
    
    public void deleteById(String id) {
        funnelRepo.deleteById(id); 
    }
}
