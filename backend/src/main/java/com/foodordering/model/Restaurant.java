package com.foodordering.model;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(nullable = false)
    private Double rating;
    
    @Column(name = "delivery_time")
    private String deliveryTime;
    
    @Column(nullable = false)
    private String location;
    
    @Column(nullable = false)
    private String cuisine;
    
    @Column(name = "is_veg")
    private Boolean isVeg = false;
    
    @Column(name = "offer_badge")
    private String offerBadge;
    
    public Restaurant() {}

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getImageUrl() { return imageUrl; }
    public Double getRating() { return rating; }
    public String getDeliveryTime() { return deliveryTime; }
    public String getLocation() { return location; }
    public String getCuisine() { return cuisine; }
    public Boolean getIsVeg() { return isVeg; }
    public String getOfferBadge() { return offerBadge; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }
    public void setLocation(String location) { this.location = location; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    public void setIsVeg(Boolean isVeg) { this.isVeg = isVeg; }
    public void setOfferBadge(String offerBadge) { this.offerBadge = offerBadge; }
}
