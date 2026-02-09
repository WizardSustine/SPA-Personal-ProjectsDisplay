package com.personalspa.personalpage.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class UserApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String roles;

    public UserApp(){
    }

    //Getters
    public Long getId(){return id;}
    public String getUsername(){return username;}    
    public String getEmail(){return email;}    
    public String getPassword(){return password;}
    public String getRoles(){return roles;}

    //Setters
    public void setId(Long id){this.id = id;}
    public void setUsername(String name){this.username = name;}
    public void setEmail(String email){this.email = email;}
    public void setPassword(String password){this.password = password;}
    public void setRoles(String roles){this.roles = roles;}
}