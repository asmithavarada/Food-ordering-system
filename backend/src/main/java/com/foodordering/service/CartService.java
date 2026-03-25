package com.foodordering.service;

import com.foodordering.dto.*;
import com.foodordering.model.*;
import com.foodordering.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private BillCalculationService billCalculationService;
    
    public CartResponse calculateCartTotals(List<CartItem> cartItems) {
        // Use BillCalculationService with Java Streams for comprehensive bill calculation
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, null);
        
        return new CartResponse(
            cartItems, 
            result.getSubtotal(), 
            result.getDeliveryFee(), 
            result.getTax(), 
            result.getFinalTotal(), 
            result.getTotalItems()
        );
    }
    
    public CartResponse calculateCartTotalsWithPromo(List<CartItem> cartItems, String promoCode) {
        // Use BillCalculationService with Java Streams for comprehensive bill calculation including promo
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(cartItems, promoCode);
        
        return new CartResponse(
            cartItems, 
            result.getSubtotal(), 
            result.getDeliveryFee(), 
            result.getTax(), 
            result.getFinalTotal(), 
            result.getTotalItems()
        );
    }
    
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setCustomerEmail(orderRequest.getCustomerEmail());
        order.setCustomerPhone(orderRequest.getCustomerPhone());
        order.setDeliveryAddress(orderRequest.getDeliveryAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        
        // Use BillCalculationService with Java Streams for comprehensive order calculation
        BillCalculationService.BillCalculationResult result = 
            billCalculationService.calculateBill(orderRequest.getItems(), orderRequest.getPromoCode());
        
        order.setSubtotal(result.getSubtotal());
        order.setDeliveryFee(result.getDeliveryFee());
        order.setTaxAmount(result.getTax());
        order.setTotalPrice(result.getFinalTotal());
        order.setOrderStatus("PENDING");
        
        // Save order first to get ID
        Order savedOrder = orderRepository.save(order);
        
        // Create order items using Java Streams
        List<OrderItem> orderItems = orderRequest.getItems().stream()
            .map(cartItem -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setFoodItemId(cartItem.getFoodItemId());
                orderItem.setFoodItemName(cartItem.getFoodItemName());
                orderItem.setFoodItemPrice(cartItem.getFoodItemPrice());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setSubtotal(cartItem.getFoodItemPrice() * cartItem.getQuantity());
                return orderItem;
            })
            .collect(Collectors.toList());
        
        orderItemRepository.saveAll(orderItems);
        savedOrder.setOrderItems(orderItems);
        
        return savedOrder;
    }
}
