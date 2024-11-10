package com.backend.backend.service;

import com.backend.backend.model.inventory;
import com.backend.backend.repository.inventoryrepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class inventoryservice {

    
    private final inventoryrepo inventoryRepo ;

    public inventoryservice(inventoryrepo inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }


    // Method to handle food donation, updating the inventory
    public inventory donateFood(String foodItem, int quantity) {
        // Check if the food item already exists in the inventory
        Optional<inventory> existingItem = inventoryRepo.findByFoodItem(foodItem);

        if (existingItem.isPresent()) {
            // Update the quantity if the item already exists
            inventory item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return inventoryRepo.save(item);
        } else {
            // Create a new inventory record if the item doesn't exist
            inventory newItem = new inventory();
            newItem.setFoodItem(foodItem);
            newItem.setQuantity(quantity);
            return inventoryRepo.save(newItem);
        }
    }
    
    // private inventory saveNewInventory(inventory inventory) {
    //         return inventoryRepo.save(inventory);
        
    // }

   
    // Method to receive food, decrementing the inventory
    public inventory receiveFood(String foodItem, int quantity) {
        Optional<inventory> existingItem = inventoryRepo.findByFoodItem(foodItem);

        if (existingItem.isPresent()) {
            inventory item = existingItem.get();
            int newQuantity = item.getQuantity() - quantity;

            // Ensure quantity does not fall below zero
            if (newQuantity < 0) {
                newQuantity = 0;
            }

            item.setQuantity(newQuantity);
            return inventoryRepo.save(item);
        } else {
            throw new RuntimeException("Item not found in inventory");
        }
    }

    // Method to get all inventory items
    public List<inventory> getAllinventoryItems() {
        return inventoryRepo.findAll();
    }

    // Method to delete an inventory item by ID
    public void deleteinventoryItem(Long id) {
        inventoryRepo.deleteById(id);
    }
}