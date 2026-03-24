import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (foodItemId: number) => void;
  updateQuantity: (foodItemId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Debug: Log cart changes
  useEffect(() => {
    console.log('Cart state updated:', cart);
  }, [cart]);

  const addToCart = (item: CartItem) => {
    console.log('Adding to cart:', item);
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.foodItemId === item.foodItemId);
      if (existingItem) {
        const updatedCart = prevCart.map(cartItem =>
          cartItem.foodItemId === item.foodItemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log('Updated cart (existing item):', updatedCart);
        return updatedCart;
      }
      const newCart = [...prevCart, { ...item, quantity: 1 }];
      console.log('New cart (new item):', newCart);
      return newCart;
    });
  };

  const removeFromCart = (foodItemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.foodItemId !== foodItemId));
  };

  const updateQuantity = (foodItemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.foodItemId === foodItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.foodItemPrice * item.quantity), 0);
  };

  const getCartCount = () => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Cart count:', count, 'Cart items:', cart);
    return count;
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
