package com.backend.backend.service;

import java.util.List;
import com.backend.backend.model.login;

public interface loginservice {
    login addLoginDetails(login loginDetails);  // Method for adding login details
    List<login> getAllLoginDetails();  // Method for retrieving all login details
    boolean validateUser(String username, String password);  // Method for validating user
}
