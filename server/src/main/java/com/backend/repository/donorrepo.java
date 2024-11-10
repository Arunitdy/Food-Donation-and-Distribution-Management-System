package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.backend.model.donor;

@Repository  // Marks this as a Spring Data repository
public interface donorrepo extends JpaRepository<donor, Long> {
    // Inherits methods like save(), findById(), findAll() from JpaRepository
}
