package com.foodordering.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * Request DTO for promo code calculation
 */
public class PromoCalculationRequest {
    
    @NotNull(message = "Cart items are required")
    private List<CartItem> cartItems;
    
    private String promoCode;

    public PromoCalculationRequest() {}

    public PromoCalculationRequest(List<CartItem> cartItems, String promoCode) {
        this.cartItems = cartItems;
        this.promoCode = promoCode;
    }

    // Getters
    public List<CartItem> getCartItems() { return cartItems; }
    public String getPromoCode() { return promoCode; }

    // Setters
    public void setCartItems(List<CartItem> cartItems) { this.cartItems = cartItems; }
    public void setPromoCode(String promoCode) { this.promoCode = promoCode; }
}
