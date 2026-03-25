package com.foodordering.service;

import com.foodordering.dto.CartItem;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for BillCalculationService
 * Demonstrates Java Stream API usage for bill calculations
 */
@SpringBootTest
public class BillCalculationServiceTest {

    private final BillCalculationService billCalculationService = new BillCalculationService();

    @Test
    public void testCalculateBillWithMultipleItems() {
        // Create test cart items
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false),
            new CartItem(3L, "Salad", 149.0, 3, "salad.jpg", true)
        );

        // Calculate bill using Java Streams
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, "FLAT10");

        // Verify calculations using stream results
        // Expected subtotal: (299 * 2) + (199 * 1) + (149 * 3) = 598 + 199 + 447 = 1244
        assertEquals(1244.0, result.getSubtotal(), 0.01);
        
        // Expected tax: 1244 * 0.05 = 62.2
        assertEquals(62.2, result.getTax(), 0.01);
        
        // Expected delivery fee: 40 (since subtotal > 0)
        assertEquals(40.0, result.getDeliveryFee(), 0.01);
        
        // Expected discount: 1244 * 0.10 = 124.4 (FLAT10)
        assertEquals(124.4, result.getDiscount(), 0.01);
        
        // Expected final total: 1244 + 62.2 + 40 - 124.4 = 1221.8
        assertEquals(1221.8, result.getFinalTotal(), 0.01);
        
        // Expected total items: 2 + 1 + 3 = 6
        assertEquals(6, result.getTotalItems());
        
        assertEquals("FLAT10", result.getAppliedPromoCode());
    }

    @Test
    public void testCalculateBillWithEmptyCart() {
        List<CartItem> emptyCart = Collections.emptyList();

        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(emptyCart, "FLAT10");

        // Verify calculations for empty cart using streams
        assertEquals(0.0, result.getSubtotal(), 0.01);
        assertEquals(0.0, result.getTax(), 0.01);
        assertEquals(0.0, result.getDeliveryFee(), 0.01); // No delivery fee for empty cart
        assertEquals(0.0, result.getDiscount(), 0.01);
        assertEquals(0.0, result.getFinalTotal(), 0.01);
        assertEquals(0, result.getTotalItems());
    }

    @Test
    public void testCalculateBillWithSave20Promo() {
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 599.0, 1, "pizza.jpg", false)
        );

        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, "SAVE20");

        // Expected subtotal: 599
        assertEquals(599.0, result.getSubtotal(), 0.01);
        
        // Expected tax: 599 * 0.05 = 29.95
        assertEquals(29.95, result.getTax(), 0.01);
        
        // Expected delivery fee: 40
        assertEquals(40.0, result.getDeliveryFee(), 0.01);
        
        // Expected discount: min(599 * 0.20, 100) = min(119.8, 100) = 100 (SAVE20 with max ₹100)
        assertEquals(100.0, result.getDiscount(), 0.01);
        
        // Expected final total: 599 + 29.95 + 40 - 100 = 568.95
        assertEquals(568.95, result.getFinalTotal(), 0.01);
    }

    @Test
    public void testCalculateBillWithFirst50Promo() {
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 1, "pizza.jpg", false)
        );

        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, "FIRST50");

        // Expected subtotal: 299
        assertEquals(299.0, result.getSubtotal(), 0.01);
        
        // Expected tax: 299 * 0.05 = 14.95
        assertEquals(14.95, result.getTax(), 0.01);
        
        // Expected delivery fee: 40
        assertEquals(40.0, result.getDeliveryFee(), 0.01);
        
        // Expected discount: min(50, 299) = 50 (FIRST50 flat ₹50)
        assertEquals(50.0, result.getDiscount(), 0.01);
        
        // Expected final total: 299 + 14.95 + 40 - 50 = 303.95
        assertEquals(303.95, result.getFinalTotal(), 0.01);
    }

    @Test
    public void testCalculateBillWithNoPromo() {
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 1, "pizza.jpg", false)
        );

        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, null);

        // Expected subtotal: 299
        assertEquals(299.0, result.getSubtotal(), 0.01);
        
        // Expected tax: 299 * 0.05 = 14.95
        assertEquals(14.95, result.getTax(), 0.01);
        
        // Expected delivery fee: 40
        assertEquals(40.0, result.getDeliveryFee(), 0.01);
        
        // Expected discount: 0 (no promo)
        assertEquals(0.0, result.getDiscount(), 0.01);
        
        // Expected final total: 299 + 14.95 + 40 - 0 = 353.95
        assertEquals(353.95, result.getFinalTotal(), 0.01);
    }

    @Test
    public void testCalculateSubOnlyWithStreams() {
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false)
        );

        // Test subtotal calculation using streams
        double subtotal = billCalculationService.calculateSubtotal(cartItems);
        
        // Expected: (299 * 2) + (199 * 1) = 598 + 199 = 797
        assertEquals(797.0, subtotal, 0.01);
    }

    @Test
    public void testCalculateTaxOnlyWithStreams() {
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 300.0, 1, "pizza.jpg", false)
        );

        // Test tax calculation using streams
        double tax = billCalculationService.calculateTax(cartItems);
        
        // Expected: 300 * 0.05 = 15
        assertEquals(15.0, tax, 0.01);
    }

    @Test
    public void testGetTotalItemsWithStreams() {
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 3, "burger.jpg", false),
            new CartItem(3L, "Salad", 149.0, 1, "salad.jpg", true)
        );

        // Test total items calculation using streams
        int totalItems = billCalculationService.getTotalItems(cartItems);
        
        // Expected: 2 + 3 + 1 = 6
        assertEquals(6, totalItems);
    }

    @Test
    public void testIsCartValidWithStreams() {
        // Test valid cart using streams
        List<CartItem> validCart = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false)
        );
        assertTrue(billCalculationService.isCartValid(validCart));

        // Test invalid cart (zero price) using streams
        List<CartItem> invalidCartPrice = Arrays.asList(
            new CartItem(1L, "Pizza", 0.0, 2, "pizza.jpg", false)
        );
        assertFalse(billCalculationService.isCartValid(invalidCartPrice));

        // Test invalid cart (zero quantity) using streams
        List<CartItem> invalidCartQuantity = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 0, "pizza.jpg", false)
        );
        assertFalse(billCalculationService.isCartValid(invalidCartQuantity));

        // Test empty cart using streams
        assertFalse(billCalculationService.isCartValid(Collections.emptyList()));
    }

    @Test
    public void testGetMostExpensiveItemWithStreams() {
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false), // Total: 598
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false), // Total: 199
            new CartItem(3L, "Salad", 149.0, 5, "salad.jpg", true)   // Total: 745 (most expensive)
        );

        // Test most expensive item calculation using streams
        CartItem mostExpensive = billCalculationService.getMostExpensiveItem(cartItems);
        
        assertNotNull(mostExpensive);
        assertEquals("Salad", mostExpensive.getFoodItemName());
        assertEquals(149.0, mostExpensive.getFoodItemPrice(), 0.01);
        assertEquals(5, mostExpensive.getQuantity());
    }

    @Test
    public void testStreamApiUsageDemonstration() {
        // This test demonstrates various Stream API operations for bill calculation
        
        List<CartItem> cartItems = Arrays.asList(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false),
            new CartItem(3L, "Salad", 149.0, 3, "salad.jpg", true)
        );

        // Demonstrate stream() usage
        System.out.println("=== Java Stream API Bill Calculation Demonstration ===");
        
        // Using mapToDouble() and sum() for subtotal
        double subtotal = cartItems.stream()
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
            .sum();
        System.out.println("Subtotal using stream().mapToDouble().sum(): " + subtotal);

        // Using mapToInt() and sum() for total items
        int totalItems = cartItems.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
        System.out.println("Total items using stream().mapToInt().sum(): " + totalItems);

        // Using filter() and count() for vegetarian items
        long vegItemsCount = cartItems.stream()
            .filter(CartItem::getIsVeg)
            .count();
        System.out.println("Vegetarian items using stream().filter().count(): " + vegItemsCount);

        // Using map() and collect() for item names
        List<String> itemNames = cartItems.stream()
            .map(CartItem::getFoodItemName)
            .toList();
        System.out.println("Item names using stream().map().toList(): " + itemNames);

        // Using max() with comparator for most expensive item
        cartItems.stream()
            .max((item1, item2) -> Double.compare(
                item1.getFoodItemPrice() * item1.getQuantity(),
                item2.getFoodItemPrice() * item2.getQuantity()
            ))
            .ifPresent(item -> System.out.println("Most expensive item using stream().max(): " + 
                item.getFoodItemName() + " (Total: " + (item.getFoodItemPrice() * item.getQuantity()) + ")"));

        // Using allMatch() for validation
        boolean allValid = cartItems.stream()
            .allMatch(item -> item.getFoodItemPrice() > 0 && item.getQuantity() > 0);
        System.out.println("All items valid using stream().allMatch(): " + allValid);

        // Calculate complete bill
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, "FLAT10");
        System.out.println("Complete bill calculation: " + result);
    }
}
