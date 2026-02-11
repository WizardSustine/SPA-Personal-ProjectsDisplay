package com.personalspa.personalpage.entities;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.personalspa.personalpage.enviroments.Enviroments;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * Utilidad para generacion, validacion y extraccion de informacion de JWT tokens.
 * Usa HMAC-SHA256 con clave de 256 bits. Tokens expiran en 1 hora.
 */
@Service
public class JWTUtil {

    
    private final long EXPIRATION = 1000 * 60 * 60; // 1 hora
    private final Key key;

      public JWTUtil(@Value("${jwt.secret}") String secret) {
        if (secret == null || secret.length() < 32) {
            throw new IllegalArgumentException("JWT secret must be at least 32 characters long");
        }
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    
    /**
     * Genera un JWT token con email como subject y lista de roles como claim.
     * Token valido por 1 hora desde su emision.
     */
    public String generateToken(String email, List<String> roles) {
        System.out.println("corre el generateToken" + email);
        roles.forEach(r -> System.out.println(r));
        return Jwts.builder()
                .setSubject(email)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /** Extrae los claims (informacion) del payload de un JWT token */
    public Claims getClaims(String token) {
        System.out.println("corre el getClaims" + token);
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /** Extrae el email (subject) del JWT token */
    public String getEmail(String token) {
        System.out.println("corre el getEmail" + token);
        return getClaims(token).getSubject();
    }

    /** Extrae la lista de roles del JWT token */
    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        System.out.println("corre el getRoles" + token);
        return (List<String>) getClaims(token).get("roles");
    }

    /** Valida si un JWT token es valido y no ha expirado */
    public boolean isTokenValid(String token) {
        System.out.println("corre el isTokenValid" + token);
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
