package com.personalspa.personalpage.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalspa.personalpage.DTOs.LoginRequest;
import com.personalspa.personalpage.DTOs.RegisterRequest;
import com.personalspa.personalpage.entities.JWTUtil;
import com.personalspa.personalpage.entities.UserApp;
import com.personalspa.personalpage.services.UserAppService;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * Controlador REST para autenticacion y autorizacion.
 * Maneja registro de nuevos usuarios y login con generacion de JWT tokens.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder encoder;
    @Autowired
    private UserAppService userService;

    public AuthController(AuthenticationManager authenticationManager, JWTUtil jwtUtil, PasswordEncoder encoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.encoder = encoder;
    }

    /**
     * Registra un nuevo usuario en el sistema.
     * Valida que username y email sean unicos antes de guardar.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userService.existsByUsername(request.username())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if (userService.existsByEmail(request.email())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        UserApp user = new UserApp();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(encoder.encode(request.password()));

        // Default
        String roles = "USER";

        // Si permitís setear roles
        if (request.roles() != null && !request.roles().isBlank()) {
            roles = request.roles().toUpperCase();
        }

        user.setRoles(roles);
        userService.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
    
    /**
     * Autentica un usuario y genera un JWT token.
     * El token contiene email y roles para posterior validacion.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        List<String> roles = authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();

       String token = jwtUtil.generateToken(
                authentication.getName(),
                roles
        );


        return ResponseEntity.ok(Map.of("token", token));
    }

   /* @PostMapping("/refresh")
    public TokenResponse refreshToken(@RequestHeader(HttpHeaders.AUTHORIZATION) final String authHeader) { 
        return authService.refreshToken(authHeader); 
    } */
    
}
