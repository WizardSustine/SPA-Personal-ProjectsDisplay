package com.personalspa.personalpage.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.UserApp;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserAppService userService;

    public CustomUserDetailsService(UserAppService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserApp user = userService.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        List<GrantedAuthority> authorities =
                    List.of(user.getRoles().split(",")).stream()
                        .map(r -> "ROLE_" + r.trim())
                        .map(role -> (GrantedAuthority) new SimpleGrantedAuthority(role))
                        .toList();

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }

}
