package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.backend.model.receiver;
import com.backend.backend.repository.ReceiverRepository;

import java.util.List;

@Service
public class receiverservice {

    @Autowired
    private ReceiverRepository receiverRepository;

    // Save receiver
    public receiver saveReceiver(receiver receiver) {
        return receiverRepository.save(receiver);
    }

    // Get all receivers
    public List<receiver> getAllReceivers() {
        return receiverRepository.findAll();
    }

    // Find receiver by ID
    public receiver findReceiverById(Long id) {
        return receiverRepository.findById(id).orElse(null);
    }

    // Delete receiver
    public void deleteReceiver(Long id) {
        receiverRepository.deleteById(id);
    }
}

