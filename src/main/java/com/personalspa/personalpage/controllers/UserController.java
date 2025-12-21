package com.personalspa.personalpage.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalspa.personalpage.entities.User;
import com.personalspa.personalpage.repositories.UserRepo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class UserController {
    @Autowired
    private UserRepo repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register/user")
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }
    

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }
}
