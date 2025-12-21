package com.personalspa.personalpage.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccessController {
    
    @GetMapping("/admin")
    public String getAdmin() {
        return "algo de admin";
    }

    @GetMapping("/user")
    public String getUser() {
        return "algo de usuario";
    }
    
    
}