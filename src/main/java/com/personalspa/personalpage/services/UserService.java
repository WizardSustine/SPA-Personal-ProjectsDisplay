package com.personalspa.personalpage.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.User;
import com.personalspa.personalpage.handlers.UsernameNotFoundException;
import com.personalspa.personalpage.repositories.UserRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<User> user = userRepo.findByUsername(username);
        if(user.isPresent()) {
            return org.springframework.security.core.userdetails.User.builder()
                .username(user.get().getUsername())
                .password(user.get().getPassword())
                .roles(getRole(user.get()))
                .build();
        } else {
            throw new UsernameNotFoundException(username
            );
        }    
    }

    private String[] getRole(User user) {
        if(user.getRoles() == null || user.getRoles().isEmpty()) {
            return new String[]{"USER"};
        }
        return user.getRoles().split(",");
    }
}
