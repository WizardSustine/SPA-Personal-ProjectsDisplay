package com.personalspa.personalpage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.UserApp;
import com.personalspa.personalpage.repositories.UserAppRepo;

import jakarta.transaction.Transactional;

/**
 * Servicio de negocio para gestion de usuarios.
 * Proporciona operaciones CRUD y validaciones de existencia de usuarios.
 */
@Service
@Transactional
public class UserAppService {

    @Autowired
    private UserAppRepo userAppRepo;

    /** Busca un usuario por email */
    public Optional<UserApp> findByEmail(String email) {
        return userAppRepo.findByEmail(email);
    }  

    /** Busca un usuario por ID */
    public Optional<UserApp> findById(Long id) {
        return userAppRepo.findById(id);
    }  

    /** Busca un usuario por nombre de usuario */
    public Optional<UserApp> findByUsername(String username) {
        return userAppRepo.findByUsername(username);
    }  

    public UserApp save(UserApp user) {
        return userAppRepo.save(user);
    }               

    public List<UserApp> findAll() {
        return userAppRepo.findAll();
    }

    public UserApp updateUser(Long id, UserApp user) {  
        UserApp thisUserApp = userAppRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found")); 
        
        thisUserApp.setUsername(user.getUsername());
        thisUserApp.setEmail(user.getEmail());
        thisUserApp.setRoles(user.getRoles());
        thisUserApp.setPassword(user.getPassword());

        return userAppRepo.save(user);
    }

    public void deleteById(Long id) {
        userAppRepo.deleteById(id); 
    }

    public boolean existsByUsername(String username){
        Optional<UserApp> user = userAppRepo.findByUsername(username);
        if(user == null){
            return true;
        }
        return false;
    }

    public boolean existsByEmail(String email){
        Optional<UserApp> user = userAppRepo.findByEmail(email);
        if(user == null){
            return true;
        }
        return false;
    }

}
