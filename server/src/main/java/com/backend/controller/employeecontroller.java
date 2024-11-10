package com.backend.backend.controller;

import com.backend.backend.model.employee;
import com.backend.backend.service.employeeservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class employeecontroller {

    @Autowired
    private employeeservice employeeService;

    // Add a new employee
    @PostMapping("/add")
    public employee addEmployee(@RequestBody employee employee) {
        return employeeService.saveEmployee(employee);
    }

    // Get all employees
    @GetMapping("/all")
    public List<employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // Delete an employee by ID
    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
