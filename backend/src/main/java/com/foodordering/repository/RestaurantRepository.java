package com.foodordering.repository;

import com.foodordering.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    
    @Query("SELECT r FROM Restaurant r WHERE " +
           "LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.location) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Restaurant> searchRestaurants(String search);
    
    List<Restaurant> findByIsVeg(Boolean isVeg);
    
    @Query("SELECT r FROM Restaurant r WHERE r.rating >= :minRating")
    List<Restaurant> findByMinRating(Double minRating);
}
