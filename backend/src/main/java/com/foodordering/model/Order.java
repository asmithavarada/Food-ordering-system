package com.foodordering.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "total_price", nullable = false)
    private Double totalPrice;
    
    @Column(name = "order_status", nullable = false)
    private String orderStatus = "PENDING";
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "delivery_address")
    private String deliveryAddress;
    
    @Column(name = "customer_name")
    private String customerName;
    
    @Column(name = "customer_email")
    private String customerEmail;
    
    @Column(name = "customer_phone")
    private String customerPhone;
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "delivery_fee")
    private Double deliveryFee = 2.99;
    
    @Column(name = "tax_amount")
    private Double taxAmount;
    
    @Column(name = "subtotal")
    private Double subtotal;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
    
    public Order() {}

    // Getters
    public Long getId() { return id; }
    public Double getTotalPrice() { return totalPrice; }
    public String getOrderStatus() { return orderStatus; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public String getCustomerName() { return customerName; }
    public String getCustomerEmail() { return customerEmail; }
    public String getCustomerPhone() { return customerPhone; }
    public String getPaymentMethod() { return paymentMethod; }
    public Double getDeliveryFee() { return deliveryFee; }
    public Double getTaxAmount() { return taxAmount; }
    public Double getSubtotal() { return subtotal; }
    public List<OrderItem> getOrderItems() { return orderItems; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public void setDeliveryFee(Double deliveryFee) { this.deliveryFee = deliveryFee; }
    public void setTaxAmount(Double taxAmount) { this.taxAmount = taxAmount; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
