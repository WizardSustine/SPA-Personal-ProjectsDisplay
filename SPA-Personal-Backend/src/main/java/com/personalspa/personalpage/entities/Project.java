package com.personalspa.personalpage.entities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;

// Entidad de dominio que representa un proyecto en el portfolio.
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private boolean isPublic;
    private List<String> technology;
    private String argument;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_attributes", joinColumns = @JoinColumn(name = "project_id"))
    @MapKeyColumn(name = "attribute_key")
    @Column(name = "attribute_value")
    private Map<String, String> attributes;

    private String docsUrl;
    private String readmeUrl;
    private String repoUrl;
    private String liveUrl;

    // Constructor sin argumentos 
    public Project(){}
    
    // Constructor con todos sus campos 
    public Project(String title, String description, String imageUrl, boolean isPublic, List<String> technology,
    String argument, Map<String, String> attributes, String docsUrl, String readmeUrl, String repoUrl, String liveUrl){
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.isPublic = isPublic;
        this.technology = new ArrayList<String>();
        this.technology.addAll(technology);
        this.argument = argument;
        this.attributes = new HashMap<>();
        this.attributes.putAll(attributes);
        this.docsUrl = docsUrl;
        this.readmeUrl = readmeUrl;
        this.repoUrl = repoUrl;
        this.liveUrl = liveUrl;
    }

    //Getters
    public Long getId(){return id;}
    public String getTitle(){ return title; }
    public String getDescription(){ return description; }
    public String getImageUrl(){ return imageUrl; }
    public boolean getIsPublic(){ return isPublic;}
    public List<String> getTechnology(){ return technology;}
    public String getArgument(){ return argument; }
    public Map<String, String> getAttributes() { return attributes; }
    public String getDocsUrl(){ return docsUrl; }
    public String getReadmeUrl(){ return readmeUrl; }
    public String getRepoUrl(){ return repoUrl; }
    public String getLiveUrl(){ return liveUrl; }

    //Setters
    public void setId(Long id){this.id = id;}
    public void setTitle(String title){ this.title = title; }
    public void setDescription(String description){ this.description = description; }
    public void setImageUrl(String imageUrl){ this.imageUrl = imageUrl; }
    public void setIsPublic(boolean isPublic){ this.isPublic = isPublic; }
    public void setTechnology(List<String> technologie){
        if(this.technology == null){
            this.technology = new ArrayList<>();
            this.technology.addAll(technologie);
        }else if(this.technology.isEmpty()){
            this.technology.addAll(technologie);
        }else{
            this.technology.clear();
            this.technology.addAll(technologie);
        }
    }
    public void setArgument(String argument){ this.argument = argument; }
    public void setAttributes(Map<String, String> attributes){
        this.attributes = attributes;
        // if(this.images == null){
        //     this.images = new HashMap<>();
        //     images.putAll(images);
        // }else if(this.images.isEmpty()){
        //     this.images.putAll(images);
        // }else{
        //     this.images.clear();
        //     this.images.putAll(images);
        // }
    }
    public void setDocsUrl(String docsUrl){ this.docsUrl = docsUrl; }
    public void setReadmeUrl(String readmeUrl){ this.readmeUrl = readmeUrl; }
    public void setRepoUrl(String repoUrl){ this.repoUrl = repoUrl; }
    public void setLiveUrl(String liveUrl){ this.liveUrl = liveUrl; }
}