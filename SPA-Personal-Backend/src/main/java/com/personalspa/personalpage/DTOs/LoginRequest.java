package com.personalspa.personalpage.DTOs;

public record LoginRequest(
    String email,
    String password
) {
}
