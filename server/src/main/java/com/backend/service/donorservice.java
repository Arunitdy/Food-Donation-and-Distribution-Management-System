package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.backend.model.donor;
import com.backend.backend.repository.donorrepo;

import java.util.List;

@Service  // Indicates that this class is a service
public class donorservice {
    @Autowired
    private donorrepo donorRepository;

    // Method to save a donor
    public donor saveDonor(donor donor) {
        return donorRepository.save(donor);
    }

    // Method to get all donors
    public List<donor> getAllDonors() {
        return donorRepository.findAll();
    }
}

