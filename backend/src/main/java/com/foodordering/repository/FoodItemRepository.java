package com.foodordering.repository;

import com.foodordering.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    
    List<FoodItem> findByRestaurantId(Long restaurantId);
    
    @Query("SELECT f FROM FoodItem f WHERE " +
           "f.restaurantId = :restaurantId AND " +
           "(LOWER(f.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(f.category) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<FoodItem> searchFoodItems(Long restaurantId, String search);
    
    List<FoodItem> findByRestaurantIdAndIsVeg(Long restaurantId, Boolean isVeg);
    
    List<FoodItem> findByRestaurantIdAndIsBestseller(Long restaurantId, Boolean isBestseller);
}
