package com.personalspa.personalpage.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.personalspa.personalpage.entities.UserApp;
import com.personalspa.personalpage.handlers.UsernameNotFoundException;
import com.personalspa.personalpage.services.UserAppService;

@RestController
@RequestMapping("/manage")
public class UserAppController {

    @Autowired
    private UserAppService userService;

    @PostMapping("/users/delete/{id}")
    public void deleteUser(@RequestParam Long id) {
        userService.deleteById(id);
    }

    @PutMapping("/users/update/{id}")
    UserApp updateUser(@RequestBody UserApp newUser, @RequestParam Long id){
        return userService.updateUser(id, newUser);
    }
    
    @GetMapping("/users/all")
    public List<UserApp> getAll () {
        return userService.findAll();
    }

    @PostMapping("/users/save")
    UserApp newUser(@RequestBody UserApp newUser) {
        return userService.save(newUser);
    }

    @GetMapping("/users/{email}")
    public UserApp getUserById(@RequestParam String email) {
        return userService.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(email));
    }

    @GetMapping("/user")
    public String getUser(){
        return "hola boludo";
    }
 
}
