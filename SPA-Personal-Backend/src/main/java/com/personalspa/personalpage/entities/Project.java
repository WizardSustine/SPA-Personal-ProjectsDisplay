package com.personalspa.personalpage.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String project;
    private String state;
    private String photo;
    private List<String> technology;

    public Project(){}

    //Getters
    public Long getId(){return id;}
    public String getName(){
        return name;
    }
    public String getProject(){
        return project;
    }
    public String getState(){
        return state;
    }
    public String getPhoto(){
        return photo;
    }
    public List<String> getTechnology(){
        return technology;
    }

    //Setters
    public void setId(Long id){this.id = id;}
    public void setName(String name){
        this.name = name;
    }
    public void setProject(String project){
        this.project = project;
    }
    public void setState(String state){
    this.state = state;
}
    public void setPhoto(String photo){
    this.photo = photo;
}
    public void setTechnology(List<String> technologie){
    if(this.technology.isEmpty()){
        this.technology.addAll(technologie);
    }else{
        this.technology.clear();
        this.technology.addAll(technologie);
    }
}
    
}
