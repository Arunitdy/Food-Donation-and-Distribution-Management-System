package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.backend.model.receiver;
import com.backend.backend.service.receiverservice;
import com.backend.backend.service.inventoryservice;
import java.util.List;

@RestController
@RequestMapping("/receivers")
@CrossOrigin(origins = "http://localhost:3000")
public class receivercontroller {

    @Autowired
    private receiverservice receiverservice;

    @Autowired
    private inventoryservice inventoryservice;

    // Add a new receiver and decrement inventory accordingly
    @PostMapping("/add")
    public receiver addReceiver(@RequestBody receiver receiver) {
        // First, save the receiver's details
        receiver savedReceiver = receiverservice.saveReceiver(receiver);

        // Now, decrement the inventory based on the receiver's request
        try {
            inventoryservice.receiveFood(receiver.getFoodType(), receiver.getQuantityNeeded());
        } catch (RuntimeException e) {
            // Handle the case where the food item is not found or there is insufficient stock
            throw new RuntimeException("Error processing the request: " + e.getMessage());
        }

        return savedReceiver;
    }

    @GetMapping("/all")
    public List<receiver> getAllReceivers() {
        return receiverservice.getAllReceivers();
    }

    // Get receiver by ID
    @GetMapping("/{id}")
    public receiver getReceiverById(@PathVariable Long id) {
        return receiverservice.findReceiverById(id);
    }

    // Delete a receiver by ID
    @DeleteMapping("/delete/{id}")
    public void deleteReceiver(@PathVariable Long id) {
        receiverservice.deleteReceiver(id);
    }
}
