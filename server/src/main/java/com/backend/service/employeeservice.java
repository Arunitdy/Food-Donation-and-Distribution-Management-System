package com.backend.backend.service;


import com.backend.backend.model.employee;
import com.backend.backend.repository.employeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class employeeservice {

    @Autowired
    private employeeRepository employeeRepository;

    // Save employee
    public employee saveEmployee(employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all employees
    public List<employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Find employee by ID
    public employee getEmployeeById(Long id) {
        Optional<employee> employee = employeeRepository.findById(id);
        return employee.orElse(null);
    }

    // Delete employee
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}

