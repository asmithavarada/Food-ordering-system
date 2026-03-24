package com.foodordering.dto;

public class CartItem {
    private Long foodItemId;
    private String foodItemName;
    private Double foodItemPrice;
    private Integer quantity;
    private String imageUrl;
    private Boolean isVeg;

    public CartItem() {}

    public CartItem(Long foodItemId, String foodItemName, Double foodItemPrice, Integer quantity, String imageUrl, Boolean isVeg) {
        this.foodItemId = foodItemId;
        this.foodItemName = foodItemName;
        this.foodItemPrice = foodItemPrice;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.isVeg = isVeg;
    }

    // Getters
    public Long getFoodItemId() { return foodItemId; }
    public String getFoodItemName() { return foodItemName; }
    public Double getFoodItemPrice() { return foodItemPrice; }
    public Integer getQuantity() { return quantity; }
    public String getImageUrl() { return imageUrl; }
    public Boolean getIsVeg() { return isVeg; }

    // Setters
    public void setFoodItemId(Long foodItemId) { this.foodItemId = foodItemId; }
    public void setFoodItemName(String foodItemName) { this.foodItemName = foodItemName; }
    public void setFoodItemPrice(Double foodItemPrice) { this.foodItemPrice = foodItemPrice; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setIsVeg(Boolean isVeg) { this.isVeg = isVeg; }
}
