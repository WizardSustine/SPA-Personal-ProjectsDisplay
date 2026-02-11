package com.personalspa.personalpage.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.personalspa.personalpage.entities.UserApp;
import com.personalspa.personalpage.handlers.UsernameNotFoundException;
import com.personalspa.personalpage.services.UserAppService;

/**
 * Controlador REST para administracion de usuarios.
 * Endpoint protegidos requieren autenticacion y roles de administrador.
 */
@RestController
@RequestMapping("/manage")
public class UserAppController {

    @Autowired
    private UserAppService userService;

    @PreAuthorize("hasAnyRole('ADMIN','MASTER')")
    @PostMapping("/users/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','MASTER')")
    @PutMapping("/users/update/{id}")
    UserApp updateUser(@RequestBody UserApp newUser, @PathVariable Long id){
        return userService.updateUser(id, newUser);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','MASTER')")
    @GetMapping("/users/all")
    public List<UserApp> getAll () {
        return userService.findAll();
    }

    @PostMapping("/users/save")
    UserApp newUser(@RequestBody UserApp newUser) {
        return userService.save(newUser);
    }
    
    @GetMapping("/users/{email}")
    public UserApp getUserById(@PathVariable String email) {
        return userService.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(email));
    }

    @GetMapping("/user")
    public String getUser(){
        return "hola boludo";
    }
 
}
