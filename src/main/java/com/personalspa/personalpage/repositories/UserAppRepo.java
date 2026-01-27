package com.personalspa.personalpage.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.personalspa.personalpage.entities.UserApp;

@Repository
public interface UserAppRepo extends JpaRepository<UserApp, Long> {
    Optional<UserApp> findByEmail(String email);
    Optional<UserApp> findByUsername(String username);
    Optional<UserApp> findById(Long id);
    
}