package com.foodordering.service;

import com.foodordering.dto.CartItem;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Bill Calculation Service using Java Stream API
 * Demonstrates proper use of streams for bill calculations
 */
@Service
public class BillCalculationService {

    private static final double TAX_RATE = 0.05; // 5% tax
    private static final double DELIVERY_FEE = 40.0; // Fixed delivery fee
    private static final double DISCOUNT_FLAT10 = 0.10; // 10% discount
    private static final double DISCOUNT_SAVE20_MAX = 100.0; // Max ₹100 for SAVE20
    private static final double DISCOUNT_SAVE20_RATE = 0.20; // 20% discount
    private static final double DISCOUNT_FIRST50 = 50.0; // Flat ₹50 discount

    /**
     * Bill calculation result class
     */
    public static class BillCalculationResult {
        private final double subtotal;
        private final double tax;
        private final double discount;
        private final double deliveryFee;
        private final double finalTotal;
        private final int totalItems;
        private final String appliedPromoCode;

        public BillCalculationResult(double subtotal, double tax, double discount, 
                                  double deliveryFee, double finalTotal, int totalItems, String appliedPromoCode) {
            this.subtotal = subtotal;
            this.tax = tax;
            this.discount = discount;
            this.deliveryFee = deliveryFee;
            this.finalTotal = finalTotal;
            this.totalItems = totalItems;
            this.appliedPromoCode = appliedPromoCode;
        }

        // Getters
        public double getSubtotal() { return subtotal; }
        public double getTax() { return tax; }
        public double getDiscount() { return discount; }
        public double getDeliveryFee() { return deliveryFee; }
        public double getFinalTotal() { return finalTotal; }
        public int getTotalItems() { return totalItems; }
        public String getAppliedPromoCode() { return appliedPromoCode; }

        @Override
        public String toString() {
            return String.format("BillCalculationResult{subtotal=%.2f, tax=%.2f, discount=%.2f, deliveryFee=%.2f, finalTotal=%.2f, totalItems=%d, promoCode='%s'}", 
                subtotal, tax, discount, deliveryFee, finalTotal, totalItems, appliedPromoCode);
        }
    }

    /**
     * Calculate bill using Java Stream API
     * 
     * @param cartItems List of cart items
     * @param promoCode Promotional code (can be null or empty)
     * @return BillCalculationResult with all calculated values
     */
    public BillCalculationResult calculateBill(List<CartItem> cartItems, String promoCode) {
        
        // 1. Calculate subtotal using streams
        // subtotal = sum of (price × quantity)
        double subtotal = cartItems.stream()
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
            .sum();
        
        // 2. Calculate total items using streams
        int totalItems = cartItems.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
        
        // 3. Calculate tax using stream result
        // tax = 5% of subtotal
        double tax = subtotal * TAX_RATE;
        
        // 4. Calculate delivery fee using stream result
        // Only charge delivery fee if subtotal > 0
        double deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0.0;
        
        // 5. Calculate discount using stream result and promo code
        double discount = calculateDiscount(subtotal, promoCode);
        
        // 6. Calculate final total using all stream results
        // finalTotal = subtotal + tax + deliveryFee - discount
        double finalTotal = subtotal + tax + deliveryFee - discount;
        
        return new BillCalculationResult(subtotal, tax, discount, deliveryFee, finalTotal, totalItems, promoCode);
    }
    
    /**
     * Calculate discount based on promo code using stream result
     * 
     * @param subtotal Subtotal from stream calculation
     * @param promoCode Promotional code
     * @return Discount amount
     */
    private double calculateDiscount(double subtotal, String promoCode) {
        if (promoCode == null || promoCode.trim().isEmpty()) {
            return 0.0;
        }
        
        String normalizedPromoCode = promoCode.trim().toUpperCase();
        
        // Use switch expression for promo code logic
        return switch (normalizedPromoCode) {
            case "FLAT10" -> {
                // Apply 10% discount using stream result
                double discount = subtotal * DISCOUNT_FLAT10;
                yield discount;
            }
            case "SAVE20" -> {
                // Apply 20% discount max ₹100 using stream result
                double discount = subtotal * DISCOUNT_SAVE20_RATE;
                yield Math.min(discount, DISCOUNT_SAVE20_MAX);
            }
            case "FIRST50" -> {
                // Apply flat ₹50 discount using stream result
                double discount = Math.min(DISCOUNT_FIRST50, subtotal);
                yield discount;
            }
            default -> 0.0; // No discount for invalid promo codes
        };
    }
    
    /**
     * Calculate subtotal only using Java Stream API
     * Demonstrates specific stream usage for subtotal calculation
     * 
     * @param cartItems List of cart items
     * @return Subtotal amount
     */
    public double calculateSubtotal(List<CartItem> cartItems) {
        return cartItems.stream()
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
            .sum();
    }
    
    /**
     * Calculate tax only using Java Stream API
     * Uses stream result for tax calculation
     * 
     * @param cartItems List of cart items
     * @return Tax amount
     */
    public double calculateTax(List<CartItem> cartItems) {
        double subtotal = calculateSubtotal(cartItems);
        return subtotal * TAX_RATE;
    }
    
    /**
     * Calculate discount only using Java Stream API
     * Uses stream result for discount calculation
     * 
     * @param cartItems List of cart items
     * @param promoCode Promotional code
     * @return Discount amount
     */
    public double calculateDiscountOnly(List<CartItem> cartItems, String promoCode) {
        double subtotal = calculateSubtotal(cartItems);
        return calculateDiscount(subtotal, promoCode);
    }
    
    /**
     * Get total items count using Java Stream API
     * 
     * @param cartItems List of cart items
     * @return Total number of items
     */
    public int getTotalItems(List<CartItem> cartItems) {
        return cartItems.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
    }
    
    /**
     * Validate cart using Java Stream API
     * 
     * @param cartItems List of cart items
     * @return true if cart is valid, false otherwise
     */
    public boolean isCartValid(List<CartItem> cartItems) {
        // Check if cart is not empty and all items have valid data
        return cartItems != null && 
               !cartItems.isEmpty() && 
               cartItems.stream()
                   .allMatch(item -> item.getFoodItemPrice() > 0 && item.getQuantity() > 0);
    }
    
    /**
     * Get most expensive item using Java Stream API
     * 
     * @param cartItems List of cart items
     * @return Most expensive cart item or null if cart is empty
     */
    public CartItem getMostExpensiveItem(List<CartItem> cartItems) {
        return cartItems.stream()
            .max((item1, item2) -> Double.compare(
                item1.getFoodItemPrice() * item1.getQuantity(),
                item2.getFoodItemPrice() * item2.getQuantity()
            ))
            .orElse(null);
    }
}
