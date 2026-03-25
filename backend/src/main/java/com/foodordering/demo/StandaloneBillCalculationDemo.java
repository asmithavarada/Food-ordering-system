package com.foodordering.demo;

import java.util.List;

/**
 * Simple CartItem class for demonstration without Spring dependencies
 */
class CartItem {
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

/**
 * Standalone Bill Calculation Service using Java Stream API
 * Demonstrates proper use of streams for bill calculations without Spring dependencies
 */
class BillCalculationService {

    private static final double TAX_RATE = 0.05; // 5% tax
    private static final double DELIVERY_FEE = 40.0; // Fixed delivery fee
    private static final double DISCOUNT_FLAT10 = 0.10; // 10% discount
    private static final double DISCOUNT_SAVE20_MAX = 100.0; // Max ₹100 for SAVE20
    private static final double DISCOUNT_SAVE20_RATE = 0.20; // 20% discount
    private static final double DISCOUNT_FIRST50 = 50.0; // Flat ₹50 discount

    /**
     * Bill calculation result class
     */
    static class BillCalculationResult {
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

/**
 * Demonstration class for Java Stream API Bill Calculation
 * This class shows how to use the BillCalculationService with various scenarios
 */
class StandaloneBillCalculationDemo {

    public static void main(String[] args) {
        BillCalculationService billCalculationService = new BillCalculationService();
        
        System.out.println("=== Java Stream API Bill Calculation Demonstration ===\n");
        
        // Demo 1: Multiple items with FLAT10 promo
        demonstrateMultipleItemsWithFlat10(billCalculationService);
        
        // Demo 2: Single item with SAVE20 promo
        demonstrateSave20Promo(billCalculationService);
        
        // Demo 3: Empty cart
        demonstrateEmptyCart(billCalculationService);
        
        // Demo 4: Individual stream calculations
        demonstrateIndividualStreamCalculations(billCalculationService);
        
        // Demo 5: Stream API operations showcase
        demonstrateStreamOperations();
    }
    
    private static void demonstrateMultipleItemsWithFlat10(BillCalculationService billCalculationService) {
        System.out.println("📊 Demo 1: Multiple Items with FLAT10 Promo");
        System.out.println("==========================================");
        
        List<CartItem> cartItems = List.of(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false),
            new CartItem(3L, "Salad", 149.0, 3, "salad.jpg", true)
        );
        
        System.out.println("Cart Items:");
        cartItems.forEach(item -> System.out.printf("  - %s: ₹%.2f × %d = ₹%.2f%n", 
            item.getFoodItemName(), item.getFoodItemPrice(), item.getQuantity(), 
            item.getFoodItemPrice() * item.getQuantity()));
        
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, "FLAT10");
        
        System.out.println("\nBill Calculation Results:");
        System.out.println("  Subtotal: ₹" + result.getSubtotal());
        System.out.println("  Tax (5%): ₹" + result.getTax());
        System.out.println("  Delivery Fee: ₹" + result.getDeliveryFee());
        System.out.println("  Discount (FLAT10): ₹" + result.getDiscount());
        System.out.println("  Final Total: ₹" + result.getFinalTotal());
        System.out.println("  Total Items: " + result.getTotalItems());
        System.out.println();
    }
    
    private static void demonstrateSave20Promo(BillCalculationService billCalculationService) {
        System.out.println("📊 Demo 2: SAVE20 Promo (Max ₹100)");
        System.out.println("=====================================");
        
        List<CartItem> cartItems = List.of(
            new CartItem(1L, "Premium Pizza", 599.0, 1, "pizza.jpg", false)
        );
        
        System.out.println("Cart Items:");
        cartItems.forEach(item -> System.out.printf("  - %s: ₹%.2f × %d = ₹%.2f%n", 
            item.getFoodItemName(), item.getFoodItemPrice(), item.getQuantity(), 
            item.getFoodItemPrice() * item.getQuantity()));
        
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, "SAVE20");
        
        System.out.println("\nBill Calculation Results:");
        System.out.println("  Subtotal: ₹" + result.getSubtotal());
        System.out.println("  Tax (5%): ₹" + result.getTax());
        System.out.println("  Delivery Fee: ₹" + result.getDeliveryFee());
        System.out.println("  Discount (SAVE20): ₹" + result.getDiscount() + " (20% of ₹" + result.getSubtotal() + " = ₹" + (result.getSubtotal() * 0.20) + ", capped at ₹100)");
        System.out.println("  Final Total: ₹" + result.getFinalTotal());
        System.out.println();
    }
    
    private static void demonstrateEmptyCart(BillCalculationService billCalculationService) {
        System.out.println("📊 Demo 3: Empty Cart");
        System.out.println("====================");
        
        List<CartItem> emptyCart = List.of();
        
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(emptyCart, "FLAT10");
        
        System.out.println("Bill Calculation Results:");
        System.out.println("  Subtotal: ₹" + result.getSubtotal());
        System.out.println("  Tax (5%): ₹" + result.getTax());
        System.out.println("  Delivery Fee: ₹" + result.getDeliveryFee() + " (No delivery fee for empty cart)");
        System.out.println("  Discount: ₹" + result.getDiscount());
        System.out.println("  Final Total: ₹" + result.getFinalTotal());
        System.out.println("  Total Items: " + result.getTotalItems());
        System.out.println();
    }
    
    private static void demonstrateIndividualStreamCalculations(BillCalculationService billCalculationService) {
        System.out.println("📊 Demo 4: Individual Stream Calculations");
        System.out.println("========================================");
        
        List<CartItem> cartItems = List.of(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false)
        );
        
        System.out.println("Individual Stream Operations:");
        
        // Subtotal using streams
        double subtotal = billCalculationService.calculateSubtotal(cartItems);
        System.out.println("  Subtotal (stream().mapToDouble().sum()): ₹" + subtotal);
        
        // Tax using streams
        double tax = billCalculationService.calculateTax(cartItems);
        System.out.println("  Tax (5% of subtotal): ₹" + tax);
        
        // Total items using streams
        int totalItems = billCalculationService.getTotalItems(cartItems);
        System.out.println("  Total Items (stream().mapToInt().sum()): " + totalItems);
        
        // Cart validation using streams
        boolean isValid = billCalculationService.isCartValid(cartItems);
        System.out.println("  Cart Valid (stream().allMatch()): " + isValid);
        
        // Most expensive item using streams
        CartItem mostExpensive = billCalculationService.getMostExpensiveItem(cartItems);
        if (mostExpensive != null) {
            System.out.println("  Most Expensive (stream().max()): " + 
                mostExpensive.getFoodItemName() + " (₹" + 
                (mostExpensive.getFoodItemPrice() * mostExpensive.getQuantity()) + ")");
        }
        System.out.println();
    }
    
    private static void demonstrateStreamOperations() {
        System.out.println("📊 Demo 5: Java Stream API Operations Showcase");
        System.out.println("============================================");
        
        List<CartItem> cartItems = List.of(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false),
            new CartItem(3L, "Salad", 149.0, 3, "salad.jpg", true),
            new CartItem(4L, "Pasta", 249.0, 1, "pasta.jpg", true)
        );
        
        System.out.println("Stream API Operations on Cart Items:");
        
        // 1. mapToDouble() and sum() for subtotal
        double subtotal = cartItems.stream()
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
            .sum();
        System.out.println("  1. Subtotal (mapToDouble + sum): ₹" + subtotal);
        
        // 2. mapToInt() and sum() for total items
        int totalItems = cartItems.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
        System.out.println("  2. Total Items (mapToInt + sum): " + totalItems);
        
        // 3. filter() and count() for vegetarian items
        long vegItemsCount = cartItems.stream()
            .filter(CartItem::getIsVeg)
            .count();
        System.out.println("  3. Vegetarian Items (filter + count): " + vegItemsCount);
        
        // 4. map() and collect() for item names
        List<String> itemNames = cartItems.stream()
            .map(CartItem::getFoodItemName)
            .toList();
        System.out.println("  4. Item Names (map + toList): " + itemNames);
        
        // 5. filter() and mapToDouble() for veg items subtotal
        double vegSubtotal = cartItems.stream()
            .filter(CartItem::getIsVeg)
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
            .sum();
        System.out.println("  5. Veg Items Subtotal (filter + mapToDouble + sum): ₹" + vegSubtotal);
        
        // 6. max() with comparator for most expensive item
        cartItems.stream()
            .max((item1, item2) -> Double.compare(
                item1.getFoodItemPrice() * item1.getQuantity(),
                item2.getFoodItemPrice() * item2.getQuantity()
            ))
            .ifPresent(item -> System.out.println("  6. Most Expensive (max with comparator): " + 
                item.getFoodItemName() + " (₹" + (item.getFoodItemPrice() * item.getQuantity()) + ")"));
        
        // 7. allMatch() for validation
        boolean allValid = cartItems.stream()
            .allMatch(item -> item.getFoodItemPrice() > 0 && item.getQuantity() > 0);
        System.out.println("  7. All Items Valid (allMatch): " + allValid);
        
        // 8. anyMatch() for expensive items
        boolean hasExpensiveItem = cartItems.stream()
            .anyMatch(item -> item.getFoodItemPrice() > 250);
        System.out.println("  8. Has Expensive Item > ₹250 (anyMatch): " + hasExpensiveItem);
        
        // 9. noneMatch() for non-veg items
        boolean noNonVeg = cartItems.stream()
            .noneMatch(item -> !item.getIsVeg());
        System.out.println("  9. No Non-Veg Items (noneMatch): " + noNonVeg);
        
        // 10. reduce() for custom calculation
        double totalWithTax = cartItems.stream()
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity() * 1.05) // Add 5% tax
            .reduce(0.0, Double::sum);
        System.out.println("  10. Total with 5% Tax (mapToDouble + reduce): ₹" + totalWithTax);
        
        System.out.println();
        System.out.println("✅ Java Stream API Bill Calculation Implementation Complete!");
        System.out.println("🎯 All calculations use Stream API: stream(), mapToDouble(), sum(), filter(), etc.");
        System.out.println("🚀 No traditional loops used - pure functional programming with streams!");
    }
}
