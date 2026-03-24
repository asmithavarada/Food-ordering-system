export interface Restaurant {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  deliveryTime: string;
  location: string;
  cuisine: string;
  isVeg: boolean;
  offerBadge?: string;
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: number;
  isVeg: boolean;
  isBestseller: boolean;
}

export interface CartItem {
  foodItemId: number;
  foodItemName: string;
  foodItemPrice: number;
  quantity: number;
  imageUrl: string;
  isVeg: boolean;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  totalItems: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  foodItemId: number;
  foodItemName: string;
  foodItemPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  items: CartItem[];
}
