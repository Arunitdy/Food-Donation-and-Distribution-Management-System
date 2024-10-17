package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.backend.model.donor;
import com.backend.backend.service.donorservice;

import java.util.List;

@RestController  // Defines this as a REST controller
@RequestMapping("/donors")  // Base URL for the donor-related endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class donorcontroller {
    @Autowired
    private donorservice donorService;

    // POST request to add a new donor
    @PostMapping("/add")
    public donor addDonor(@RequestBody donor donor) {
        return donorService.saveDonor(donor);
    }

    // GET request to retrieve all donors
    @GetMapping("/all")
    public List<donor> getAllDonors() {
        return donorService.getAllDonors();
    }
}
