package com.demo.week10.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String role; // ROLE_USER, ROLE_ADMIN

    // ---------- constructors ----------
    public User() {}

    public User(String u, String p, String r) {
        this.username = u;
        this.password = p;
        this.role = r;
    }

    // ---------- getters setters ----------
    public Long getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }

    public String getPassword() { return password; }
    public void setPassword(String p) { this.password = p; }

    public String getRole() { return role; }
    public void setRole(String r) { this.role = r; }
}
