package com.backend.backend.model;

import jakarta.persistence.*;

@Entity
public class login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  

    @Column(name = "id")  
    private Long id;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "password")  
    private String password;

    @Column(name = "username")  
    private String username;

    @Column(name = "sector")
    private String sector;
    
    public login() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }
}
