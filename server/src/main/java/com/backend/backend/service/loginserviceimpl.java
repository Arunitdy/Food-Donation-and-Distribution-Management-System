package com.backend.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.backend.model.login;
import com.backend.backend.repository.loginrepo;

@Service  
public class loginserviceimpl implements loginservice {

    @Autowired  
    private loginrepo loginRepository;

    @Override
    public login addLoginDetails(login loginDetails) {
        return loginRepository.save(loginDetails);  
    }

    @Override
    public List<login> getAllLoginDetails() {
        return loginRepository.findAll();  
    }

    // Validate user credentials
    @Override
    public boolean validateUser(String username, String password) {
        login user = loginRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
