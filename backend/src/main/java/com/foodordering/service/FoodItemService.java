package com.foodordering.service;

import com.foodordering.model.FoodItem;
import com.foodordering.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {
    
    @Autowired
    private FoodItemRepository foodItemRepository;
    
    public List<FoodItem> getFoodItemsByRestaurant(Long restaurantId) {
        return foodItemRepository.findByRestaurantId(restaurantId);
    }
    
    public List<FoodItem> searchFoodItems(Long restaurantId, String query) {
        return foodItemRepository.searchFoodItems(restaurantId, query);
    }
    
    public List<FoodItem> filterByVeg(Long restaurantId, Boolean isVeg) {
        return foodItemRepository.findByRestaurantIdAndIsVeg(restaurantId, isVeg);
    }
    
    public List<FoodItem> getBestsellers(Long restaurantId) {
        return foodItemRepository.findByRestaurantIdAndIsBestseller(restaurantId, true);
    }
}
