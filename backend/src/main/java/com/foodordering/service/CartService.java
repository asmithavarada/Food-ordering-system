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
    private FoodItemRepository foodItemRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    public CartResponse calculateCartTotals(List<CartItem> cartItems) {
        // Use Java Streams to calculate totals
        Double subtotal = cartItems.stream()
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
            .sum();
        
        Integer totalItems = cartItems.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
        
        Double deliveryFee = 2.99;
        Double tax = subtotal * 0.08;
        Double total = subtotal + deliveryFee + tax;
        
        return new CartResponse(cartItems, subtotal, deliveryFee, tax, total, totalItems);
    }
    
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setCustomerEmail(orderRequest.getCustomerEmail());
        order.setCustomerPhone(orderRequest.getCustomerPhone());
        order.setDeliveryAddress(orderRequest.getDeliveryAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        
        // Calculate totals using Java Streams
        Double subtotal = orderRequest.getItems().stream()
            .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
            .sum();
        Double deliveryFee = 2.99;
        Double taxAmount = subtotal * 0.08;
        Double totalPrice = subtotal + deliveryFee + taxAmount;
        
        order.setSubtotal(subtotal);
        order.setDeliveryFee(deliveryFee);
        order.setTaxAmount(taxAmount);
        order.setTotalPrice(totalPrice);
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
