package com.login.login.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

public class Login_details {
    @Id
    @Column(name = "password")
    private String password;

    @Column(name = "username")
    private String username;

    public Login_details(){
        
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

    public void setUsername(String username) {
        this.username = username;
    }

    public Login_details save(Login_details login_details) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
}
