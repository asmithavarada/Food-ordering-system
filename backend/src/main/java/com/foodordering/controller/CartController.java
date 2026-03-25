package com.foodordering.controller;

import com.foodordering.dto.*;
import com.foodordering.model.Order;
import com.foodordering.service.CartService;
import com.foodordering.service.BillCalculationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private BillCalculationService billCalculationService;
    
    @PostMapping("/cart/calculate")
    public ResponseEntity<CartResponse> calculateCart(@RequestBody List<CartItem> cartItems) {
        CartResponse response = cartService.calculateCartTotals(cartItems);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/cart/calculate-with-promo")
    public ResponseEntity<BillCalculationService.BillCalculationResult> calculateCartWithPromo(
            @RequestBody PromoCalculationRequest request) {
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(request.getCartItems(), request.getPromoCode());
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/orders")
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequest orderRequest) {
        Order order = cartService.createOrder(orderRequest);
        return ResponseEntity.ok(order);
    }
    
    @GetMapping("/bill/demo")
    public ResponseEntity<BillCalculationService.BillCalculationResult> demoBillCalculation() {
        // Demo data for Java Stream API bill calculation
        List<CartItem> demoCart = List.of(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false),
            new CartItem(3L, "Salad", 149.0, 3, "salad.jpg", true)
        );
        
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(demoCart, "FLAT10");
        
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/bill/subtotal-demo")
    public ResponseEntity<Double> demoSubtotalCalculation() {
        // Demo subtotal calculation using Java Streams
        List<CartItem> demoCart = List.of(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 1, "burger.jpg", false)
        );
        
        double subtotal = billCalculationService.calculateSubtotal(demoCart);
        return ResponseEntity.ok(subtotal);
    }
    
    @GetMapping("/bill/tax-demo")
    public ResponseEntity<Double> demoTaxCalculation() {
        // Demo tax calculation using Java Streams
        List<CartItem> demoCart = List.of(
            new CartItem(1L, "Pizza", 300.0, 1, "pizza.jpg", false)
        );
        
        double tax = billCalculationService.calculateTax(demoCart);
        return ResponseEntity.ok(tax);
    }
    
    @GetMapping("/bill/items-demo")
    public ResponseEntity<Integer> demoTotalItemsCalculation() {
        // Demo total items calculation using Java Streams
        List<CartItem> demoCart = List.of(
            new CartItem(1L, "Pizza", 299.0, 2, "pizza.jpg", false),
            new CartItem(2L, "Burger", 199.0, 3, "burger.jpg", false),
            new CartItem(3L, "Salad", 149.0, 1, "salad.jpg", true)
        );
        
        int totalItems = billCalculationService.getTotalItems(demoCart);
        return ResponseEntity.ok(totalItems);
    }
}
