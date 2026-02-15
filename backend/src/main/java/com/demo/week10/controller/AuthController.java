package com.demo.week10.controller;

import com.demo.week10.config.JwtUtil;
import com.demo.week10.dto.*;
import com.demo.week10.service.UserService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    private final UserService s;
    private final JwtUtil jwtUtil;

    public AuthController(UserService s, JwtUtil jwtUtil) {
        this.s = s;
        this.jwtUtil = jwtUtil;
    }


    // ✅ REGISTER
    @PostMapping("/register")
    public ApiResponse<Object> register(@RequestBody LoginRequest r) {

        s.register(r.username(), r.password());

        return new ApiResponse<>(true,"User created successfully",null);
    }


    // ✅ LOGIN
    @PostMapping("/login")
    public ApiResponse<String> login(@RequestBody LoginRequest r) {

        s.login(r.username(), r.password());

        String token = jwtUtil.generateToken(r.username());

        log.info("JWT issued for user: {}", r.username());

        return new ApiResponse<>(true,"Login successful",token);
    }
}
