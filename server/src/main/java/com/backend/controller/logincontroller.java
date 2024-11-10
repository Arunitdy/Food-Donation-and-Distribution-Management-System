package com.backend.backend.controller;

import com.backend.backend.model.login;
import com.backend.backend.service.loginservice;
import com.backend.backend.service.loginserviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class logincontroller {

    @Autowired
    private loginservice userService;

    // Signup Endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody login user) {
        userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    // Login Endpoint

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody login user) {
        boolean isAuthenticated = userService.authenticateUser(user.getEmail(), user.getPassword());
        if (isAuthenticated) {
            //JSONObject result=new JSONObject(); 
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<login>> getAllLoginDetails() {
        List<login> loginList = userService.getAllLoginDetails();
        return ResponseEntity.ok(loginList);
    }
}
