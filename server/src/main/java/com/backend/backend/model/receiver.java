package com.backend.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class receiver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receiver_id")
    private Long id;

    @Column(name = "food_type")
    private String foodType;

    @Column(name = "date_of_requirement")
    private LocalDate dateOfRequirement;

    @Column(name = "preferred_time")
    private LocalTime preferredTime;

    @Column(name = "quantity_needed")
    private int quantityNeeded;

    @Column(name = "address")
    private String address;

    @Column(name = "phoneno")
    private Integer phoneno;

    @Column(name = "name")
    private String name;

    // Default constructor
    public receiver() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public LocalDate getDateOfRequirement() {
        return dateOfRequirement;
    }

    public void setDateOfRequirement(LocalDate dateOfRequirement) {
        this.dateOfRequirement = dateOfRequirement;
    }

    public LocalTime getPreferredTime() {
        return preferredTime;
    }

    public void setPreferredTime(LocalTime preferredTime) {
        this.preferredTime = preferredTime;
    }

    public int getQuantityNeeded() {
        return quantityNeeded;
    }

    public void setQuantityNeeded(int quantityNeeded) {
        this.quantityNeeded = quantityNeeded;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getPhoneno() {
        return phoneno;
    }

    public void setPhoneno(Integer phoneno) {
        this.phoneno = phoneno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
}
