package com.login.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.login.login.repository.loginrepo;
import com.login.login.model.Login_details;

@RestController  // Defines this as a REST controller
@RequestMapping("/login")  // Base URL for the login-related endpoints
public class ctrl {

    @Autowired  // Injects the repository into the controller
    private loginrepo loginRepository;

    // POST request to add new login details
    @PostMapping("/add")
    public Login_details addLoginDetails(@RequestBody Login_details loginDetails) {
        return loginRepository.save(loginDetails);
    }
}
















/*package com.login.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.login.login.model.Login_details;
@RestController
@RequestMapping("/login")
public class ctrl {
    @Autowired
    private Login_details donorRepository;

    @PostMapping("/add")
    public Login_details addLogin(@RequestBody Login_details login_details) {
        return donorRepository.save(login_details);
    }
} */