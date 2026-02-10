package com.personalspa.personalpage.services;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.entities.UserApp;

/**
 * Servicio que carga los detalles del usuario para verificacion de credenciales.
 * Implementa UserDetailsService de Spring Security.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserAppService userService;

    public CustomUserDetailsService(UserAppService userService) {
        this.userService = userService;
    }

    /**
     * Carga los detalles del usuario por email.
     * Retorna un UserDetails con email, password y autoridades para Spring Security.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserApp user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        List<GrantedAuthority> authorities =
                    List.of(user.getRoles().split(",")).stream()
                        .map(r -> "ROLE_" + r.trim())
                        .map(role -> (GrantedAuthority) new SimpleGrantedAuthority(role))
                        .toList();

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

}
