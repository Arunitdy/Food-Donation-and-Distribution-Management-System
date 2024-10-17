package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.backend.model.login;

@Repository  
public interface loginrepo extends JpaRepository<login, Long> {
    login findByUsername(String username);  // Custom method to find user by username
}