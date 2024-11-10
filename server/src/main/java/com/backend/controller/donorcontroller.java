package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.backend.model.donor;  // Ensure correct casing for the class name
import com.backend.backend.service.donorservice;  // Ensure correct casing for the class name
import com.backend.backend.service.inventoryservice;  // Ensure correct casing for the class name

import java.util.List;

@RestController  // Defines this as a REST controller
@RequestMapping("/donors")  // Base URL for the donor-related endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class donorcontroller {

    @Autowired
    private donorservice donorService;

    @Autowired
    private inventoryservice inventoryService; // Autowire the InventoryService

    // POST request to add a new donor
    @PostMapping("/add")
    public donor adddonor(@RequestBody donor donor) {
        return donorService.saveDonor(donor);
    }

    // GET request to retrieve all donors
    @GetMapping("/all")
    public List<donor> getAlldonors() {
        return donorService.getAllDonors();
    }

    @PostMapping("/inventoryadd")
    public donor addInventory(@RequestBody donor donor) {
        donor saveddonor = donorService.saveDonor(donor);
        
        try {
            inventoryService.donateFood(donor.getFoodType(), donor.getQuantity());
        } catch (Exception e) {
            throw new RuntimeException("Failed to update inventory: " + e.getMessage());
        }
        
        return saveddonor;
    }
}
