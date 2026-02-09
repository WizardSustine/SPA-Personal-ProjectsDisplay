package com.personalspa.personalpage.entities;

import java.util.Date;
import java.util.List;


import org.springframework.stereotype.Component;

import com.personalspa.personalpage.enviroments.Enviroments;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {

    private final String SECRET = Enviroments.JWT_SECRET_KEY;
    private final long EXPIRATION = 1000 * 60 * 60; // 1 hora
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

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

    public Claims getClaims(String token) {
        System.out.println("corre el getClaims" + token);
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getEmail(String token) {
        System.out.println("corre el getEmail" + token);
        return getClaims(token).getSubject();
    }

    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        System.out.println("corre el getRoles" + token);
        return (List<String>) getClaims(token).get("roles");
    }

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
