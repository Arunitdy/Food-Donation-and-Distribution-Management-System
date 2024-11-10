package com.backend.backend.service;

import com.backend.backend.model.login;
import com.backend.backend.repository.loginrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class loginserviceimpl implements loginservice {

    @Autowired
    private loginrepo userRepository;

    @Override
    public login registerUser(login user) {
        return userRepository.save(user);
    }

    @Override
    public boolean authenticateUser(String email, String password) {
        login existingUser = userRepository.findByEmail(email);
        System.out.println("Attempting to authenticate user: " + email);
        if (existingUser != null) {
            System.out.println("User found: " + existingUser.getUsername());
            return existingUser.getPassword().equals(password);
        }
        System.out.println("User not found.");
        return false;
    }

    

    @Override
    public List<login> getAllLoginDetails() {
        return userRepository.findAll();
    }
}
