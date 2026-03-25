package com.foodordering.demo;

import com.foodordering.dto.CartItem;
import com.foodordering.service.BillCalculationService;

import java.util.Arrays;
import java.util.List;

/**
 * Demonstration class for Java Stream API Bill Calculation
 * This class shows how to use the BillCalculationService with various scenarios
 */
public class BillCalculationDemo {

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
        
        List<CartItem> cartItems = Arrays.asList(
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
        
        List<CartItem> cartItems = Arrays.asList(
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
        
        List<CartItem> emptyCart = Arrays.asList();
        
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
        
        List<CartItem> cartItems = Arrays.asList(
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
        
        List<CartItem> cartItems = Arrays.asList(
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
