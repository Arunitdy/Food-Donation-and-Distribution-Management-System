package com.backend.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.backend.model.login;
import com.backend.backend.service.loginservice;

@RestController  
@RequestMapping("/login")  
@CrossOrigin(origins = "http://localhost:3000")
public class control {

    @Autowired  
    private loginservice loginService;

    // POST request to add new login details (signup)
    @PostMapping("/signup")
    public ResponseEntity<login> addLoginDetails(@RequestBody login loginDetails) {
        login newUser = loginService.addLoginDetails(loginDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser); // Return created user with 201 status
    }
    
// Backend Controller (control.java)
/*@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody login loginDetails) {
    System.out.println("Login attempt for username: " + loginDetails.getUsername());
    boolean isValidUser = loginService.validateUser(loginDetails.getUsername(), loginDetails.getPassword());
    if (isValidUser) {
        System.out.println("Login successful for username: " + loginDetails.getUsername());
        return ResponseEntity.ok("Login successful");
    } else {
        System.out.println("Invalid login attempt for username: " + loginDetails.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}*/
@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody login loginDetails) {
    System.out.println("Login attempt for username: " + loginDetails.getUsername());
    try {
        boolean isValidUser = loginService.validateUser(loginDetails.getUsername(), loginDetails.getPassword());
        if (isValidUser) {
            System.out.println("Login successful for username: " + loginDetails.getUsername());
            return ResponseEntity.ok("Login successful");
        } else {
            System.out.println("Invalid login attempt for username: " + loginDetails.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    } catch (Exception e) {
        System.err.println("Error during login: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the login");
    }
}




    // GET request to retrieve all login details
    @GetMapping("/all")
    public List<login> getAllLoginDetails() {
        return loginService.getAllLoginDetails();  
    }
}
