package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.backend.model.inventory;
import com.backend.backend.repository.inventoryrepo;

import java.util.List;
import java.util.Optional;

@Service
public class inventoryservice {

    @Autowired
    private inventoryrepo inventoryRepo;

    // Method to add or donate a food item, incrementing the quantity
    public inventory donateFood(String foodItem, int quantityToAdd) {
        Optional<inventory> optionalinventory = inventoryRepo.findByFoodItem(foodItem);

        inventory inventory;
        if (optionalinventory.isPresent()) {
            // Update existing inventory item
            inventory = optionalinventory.get();
            int currentQuantity = inventory.getQuantity();
            inventory.setQuantity(currentQuantity + quantityToAdd);
        } else {
            // Add a new inventory item
            inventory = new inventory();
            inventory.setFoodItem(foodItem);
            inventory.setQuantity(quantityToAdd);
        }
        return inventoryRepo.save(inventory);
    }

    // Method to decrement the quantity when food is received
    public inventory receiveFood(String foodItem, int quantityToDecrement) {
        Optional<inventory> optionalinventory = inventoryRepo.findByFoodItem(foodItem);

        if (optionalinventory.isPresent()) {
            inventory inventory = optionalinventory.get();
            int currentQuantity = inventory.getQuantity();

            if (currentQuantity >= quantityToDecrement) {
                inventory.setQuantity(currentQuantity - quantityToDecrement);
                return inventoryRepo.save(inventory);
            } else {
                throw new IllegalArgumentException("Not enough quantity available.");
            }
        } else {
            throw new IllegalArgumentException("inventory item not found.");
        }
    }

    // Method to get all inventory items
    public List<inventory> getAllinventoryItems() {
        return inventoryRepo.findAll();
    }

    // Method to delete an inventory item
    public void deleteinventoryItem(Long id) {
        inventoryRepo.deleteById(id);
    }
}
