export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
  category: 'veg' | 'non-veg' | 'both';
  location?: string;
  offerBadge?: string;
}

export interface Food {
  id: string;
  name: string;
  category: 'veg' | 'non-veg';
  price: number;
  imageUrl: string;
  restaurantName: string;
  restaurantId: string;
  description?: string;
  rating?: number;
  prepTime?: number;
  isBestseller?: boolean;
}

export interface CartItem extends Food {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
}

export interface FormData {
  foodName: string;
  category: 'veg' | 'non-veg';
  price: string;
  imageUrl: string;
  restaurantName: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}
