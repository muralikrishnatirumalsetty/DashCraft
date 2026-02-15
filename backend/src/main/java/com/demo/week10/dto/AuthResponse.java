package com.demo.week10.dto;

public record AuthResponse(
        String token,
        String username,
        String role
) {}
