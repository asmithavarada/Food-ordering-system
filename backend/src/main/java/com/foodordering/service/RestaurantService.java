package com.foodordering.service;

import com.foodordering.model.Restaurant;
import com.foodordering.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }
    
    public Restaurant getRestaurantById(Long id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        return restaurant.orElse(null);
    }
    
    public List<Restaurant> searchRestaurants(String query) {
        return restaurantRepository.searchRestaurants(query);
    }
    
    public List<Restaurant> filterByVeg(Boolean isVeg) {
        return restaurantRepository.findByIsVeg(isVeg);
    }
    
    public List<Restaurant> filterByRating(Double minRating) {
        return restaurantRepository.findByMinRating(minRating);
    }
}
