package com.login.login.controller;

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
} 