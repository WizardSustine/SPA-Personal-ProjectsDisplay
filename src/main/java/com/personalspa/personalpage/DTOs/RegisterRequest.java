package com.personalspa.personalpage.DTOs;

public record RegisterRequest(
    String email,
    String password,
    String username,
    String roles
) {
}
