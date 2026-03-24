package com.foodordering.controller;

import com.foodordering.dto.*;
import com.foodordering.model.Order;
import com.foodordering.service.CartService;
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
    
    @PostMapping("/cart/calculate")
    public ResponseEntity<CartResponse> calculateCart(@RequestBody List<CartItem> cartItems) {
        CartResponse response = cartService.calculateCartTotals(cartItems);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/orders")
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequest orderRequest) {
        Order order = cartService.createOrder(orderRequest);
        return ResponseEntity.ok(order);
    }
}
