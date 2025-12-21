package com.personalspa.personalpage.DB;

import org.slf4j.Logger;
import org.springframework.context.annotation.Configuration;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
/*
import com.personalspa.personalpage.controllers.ProjectController;
import com.personalspa.personalpage.entities.Project;
import com.personalspa.personalpage.repositories.ProjectRepo;
*//* 
@Configuration
public class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner algo(){
    return args -> {
      log.info("Hello from CommandLineRunner");
    };
  }
  /*initDatabase(ProjectRepo repo) {

    return args -> {
      log.info("Preloading " + repo.save(new Project(1, "Bilbo Baggins")));
      log.info("Preloading " + repo.save(new Project(2, "Frodo Baggins")));
    };
  }
} */