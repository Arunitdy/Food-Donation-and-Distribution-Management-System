package com.backend.backend.repository;

import com.backend.backend.model.employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface employeeRepository extends JpaRepository<employee, Long> {
    // You can define custom queries here if needed
}

