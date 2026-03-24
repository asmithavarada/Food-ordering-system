import axios from 'axios';
import { Restaurant, FoodItem, CartResponse, Order, OrderRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const restaurantService = {
  getAllRestaurants: async (): Promise<Restaurant[]> => {
    const response = await api.get('/restaurants');
    return response.data;
  },

  getRestaurantById: async (id: number): Promise<Restaurant> => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  searchRestaurants: async (query: string): Promise<Restaurant[]> => {
    const response = await api.get('/restaurants/search', { params: { query } });
    return response.data;
  },

  filterByVeg: async (isVeg: boolean): Promise<Restaurant[]> => {
    const response = await api.get('/restaurants/filter/veg', { params: { isVeg } });
    return response.data;
  },

  filterByRating: async (minRating: number): Promise<Restaurant[]> => {
    const response = await api.get('/restaurants/filter/rating', { params: { minRating } });
    return response.data;
  },
};

export const foodItemService = {
  getFoodItemsByRestaurant: async (restaurantId: number): Promise<FoodItem[]> => {
    const response = await api.get(`/food-items/restaurant/${restaurantId}`);
    return response.data;
  },

  searchFoodItems: async (restaurantId: number, query: string): Promise<FoodItem[]> => {
    const response = await api.get(`/food-items/restaurant/${restaurantId}/search`, { 
      params: { query } 
    });
    return response.data;
  },

  filterByVeg: async (restaurantId: number, isVeg: boolean): Promise<FoodItem[]> => {
    const response = await api.get(`/food-items/restaurant/${restaurantId}/filter/veg`, { 
      params: { isVeg } 
    });
    return response.data;
  },

  getBestsellers: async (restaurantId: number): Promise<FoodItem[]> => {
    const response = await api.get(`/food-items/restaurant/${restaurantId}/bestsellers`);
    return response.data;
  },
};

export const cartService = {
  calculateCart: async (items: any[]): Promise<CartResponse> => {
    const response = await api.post('/cart/calculate', items);
    return response.data;
  },

  placeOrder: async (orderRequest: OrderRequest): Promise<Order> => {
    const response = await api.post('/orders', orderRequest);
    return response.data;
  },
};

export const orderService = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  getOrdersByEmail: async (email: string): Promise<Order[]> => {
    const response = await api.get(`/orders/customer/${email}`);
    return response.data;
  },
};
