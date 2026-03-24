package com.foodordering.model;

import jakarta.persistence.*;

@Entity
@Table(name = "food_items")
public class FoodItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private Double price;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(nullable = false)
    private String category;
    
    @Column(name = "restaurant_id", nullable = false)
    private Long restaurantId;
    
    @Column(name = "is_veg")
    private Boolean isVeg = false;
    
    @Column(name = "is_bestseller")
    private Boolean isBestseller = false;
    
    public FoodItem() {}

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public String getImageUrl() { return imageUrl; }
    public String getCategory() { return category; }
    public Long getRestaurantId() { return restaurantId; }
    public Boolean getIsVeg() { return isVeg; }
    public Boolean getIsBestseller() { return isBestseller; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(Double price) { this.price = price; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setCategory(String category) { this.category = category; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }
    public void setIsVeg(Boolean isVeg) { this.isVeg = isVeg; }
    public void setIsBestseller(Boolean isBestseller) { this.isBestseller = isBestseller; }
}
