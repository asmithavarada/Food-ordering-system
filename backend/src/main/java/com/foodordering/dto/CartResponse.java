package com.foodordering.dto;

import java.util.List;

public class CartResponse {
    private List<CartItem> items;
    private Double subtotal;
    private Double deliveryFee;
    private Double tax;
    private Double total;
    private Integer totalItems;

    public CartResponse() {}

    public CartResponse(List<CartItem> items, Double subtotal, Double deliveryFee, Double tax, Double total, Integer totalItems) {
        this.items = items;
        this.subtotal = subtotal;
        this.deliveryFee = deliveryFee;
        this.tax = tax;
        this.total = total;
        this.totalItems = totalItems;
    }

    // Getters
    public List<CartItem> getItems() { return items; }
    public Double getSubtotal() { return subtotal; }
    public Double getDeliveryFee() { return deliveryFee; }
    public Double getTax() { return tax; }
    public Double getTotal() { return total; }
    public Integer getTotalItems() { return totalItems; }

    // Setters
    public void setItems(List<CartItem> items) { this.items = items; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
    public void setDeliveryFee(Double deliveryFee) { this.deliveryFee = deliveryFee; }
    public void setTax(Double tax) { this.tax = tax; }
    public void setTotal(Double total) { this.total = total; }
    public void setTotalItems(Integer totalItems) { this.totalItems = totalItems; }
}
