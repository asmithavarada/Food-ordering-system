package com.foodordering.controller;

import com.foodordering.model.Restaurant;
import com.foodordering.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class RestaurantController {
    
    @Autowired
    private RestaurantService restaurantService;
    
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.getRestaurantById(id);
        if (restaurant != null) {
            return ResponseEntity.ok(restaurant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam String query) {
        return ResponseEntity.ok(restaurantService.searchRestaurants(query));
    }
    
    @GetMapping("/filter/veg")
    public ResponseEntity<List<Restaurant>> filterByVeg(@RequestParam Boolean isVeg) {
        return ResponseEntity.ok(restaurantService.filterByVeg(isVeg));
    }
    
    @GetMapping("/filter/rating")
    public ResponseEntity<List<Restaurant>> filterByRating(@RequestParam Double minRating) {
        return ResponseEntity.ok(restaurantService.filterByRating(minRating));
    }
}
