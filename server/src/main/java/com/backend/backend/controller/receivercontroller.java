package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.backend.model.receiver;
import com.backend.backend.service.receiverservice;

import java.util.List;

@RestController
@RequestMapping("/receivers")
@CrossOrigin(origins = "http://localhost:3000")
public class receivercontroller {

    @Autowired
    private receiverservice receiverservice;

    // Add a new receiver
    @PostMapping("/add")
    public receiver addReceiver(@RequestBody receiver receiver) {
        return receiverservice.saveReceiver(receiver);
    }

    // Get all receivers
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

