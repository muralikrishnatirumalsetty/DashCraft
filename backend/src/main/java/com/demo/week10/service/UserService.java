package com.demo.week10.service;

import com.demo.week10.model.User;
import com.demo.week10.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder pe;

    public UserService(UserRepository repo, PasswordEncoder pe) {
        this.repo = repo;
        this.pe = pe;
    }

    // ✅ REGISTER
    public void register(String u, String p) {

        log.info("Register attempt for user: {}", u);

        if (repo.findByUsername(u).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUsername(u);
        user.setPassword(pe.encode(p));
        user.setRole("ROLE_USER");

        repo.save(user);

        log.info("User registered successfully: {}", u);
    }


    // ✅ LOGIN
    public void login(String u, String p) {

        log.info("Login attempt for user: {}", u);

        User user = repo.findByUsername(u)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!pe.matches(p, user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        log.info("Login success: {}", u);
    }
}
