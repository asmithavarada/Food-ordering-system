package com.foodordering.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @Column(name = "food_item_id", nullable = false)
    private Long foodItemId;
    
    @Column(name = "food_item_name")
    private String foodItemName;
    
    @Column(name = "food_item_price")
    private Double foodItemPrice;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private Double subtotal;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_item_id", insertable = false, updatable = false)
    private FoodItem foodItem;
    
    public OrderItem() {}

    // Getters
    public Long getId() { return id; }
    public Order getOrder() { return order; }
    public Long getFoodItemId() { return foodItemId; }
    public String getFoodItemName() { return foodItemName; }
    public Double getFoodItemPrice() { return foodItemPrice; }
    public Integer getQuantity() { return quantity; }
    public Double getSubtotal() { return subtotal; }
    public FoodItem getFoodItem() { return foodItem; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setOrder(Order order) { this.order = order; }
    public void setFoodItemId(Long foodItemId) { this.foodItemId = foodItemId; }
    public void setFoodItemName(String foodItemName) { this.foodItemName = foodItemName; }
    public void setFoodItemPrice(Double foodItemPrice) { this.foodItemPrice = foodItemPrice; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
    public void setFoodItem(FoodItem foodItem) { this.foodItem = foodItem; }
}
