package com.personalspa.personalpage.handlers;

public class ProjectNotFoundException extends RuntimeException {

  public ProjectNotFoundException(Long id) {
    super("Could not find project " + id);
  }
    
}
