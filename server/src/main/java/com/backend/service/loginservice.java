package com.backend.backend.service;

import com.backend.backend.model.login;

import java.util.List;

public interface loginservice {
    login registerUser(login user);
    boolean authenticateUser(String username, String password);

    List<login> getAllLoginDetails();
    
}
