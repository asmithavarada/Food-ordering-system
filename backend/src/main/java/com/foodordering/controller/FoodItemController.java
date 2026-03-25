package com.foodordering.controller;

import com.foodordering.model.FoodItem;
import com.foodordering.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food-items")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class FoodItemController {
    
    @Autowired
    private FoodItemService foodItemService;
    
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodItem>> getFoodItemsByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(foodItemService.getFoodItemsByRestaurant(restaurantId));
    }
    
    @GetMapping("/restaurant/{restaurantId}/search")
    public ResponseEntity<List<FoodItem>> searchFoodItems(
            @PathVariable Long restaurantId, 
            @RequestParam String query) {
        return ResponseEntity.ok(foodItemService.searchFoodItems(restaurantId, query));
    }
    
    @GetMapping("/restaurant/{restaurantId}/filter/veg")
    public ResponseEntity<List<FoodItem>> filterByVeg(
            @PathVariable Long restaurantId, 
            @RequestParam Boolean isVeg) {
        return ResponseEntity.ok(foodItemService.filterByVeg(restaurantId, isVeg));
    }
    
    @GetMapping("/restaurant/{restaurantId}/bestsellers")
    public ResponseEntity<List<FoodItem>> getBestsellers(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(foodItemService.getBestsellers(restaurantId));
    }
}
