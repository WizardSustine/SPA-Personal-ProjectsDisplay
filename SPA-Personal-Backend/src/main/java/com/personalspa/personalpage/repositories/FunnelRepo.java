package com.personalspa.personalpage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.personalspa.personalpage.entities.Funnel;

public interface FunnelRepo extends JpaRepository<Funnel, String> {

    
} 
