import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Order, Food } from '../types';

interface CartStore {
  items: CartItem[];
  orders: Order[];
  promoCode: string;
  deliveryTime: string;
  paymentMethod: string;
  addItem: (item: Food | CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setPromoCode: (code: string) => void;
  setDeliveryTime: (time: string) => void;
  setPaymentMethod: (method: string) => void;
  applyPromoCode: (code: string) => boolean;
  placeOrder: () => string | null;
}

// Reactive selectors - derived state
const TAX_RATE = 0.05;
const DELIVERY_FEE = 40;

const getSubtotal = (state: CartStore) => 
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);

const getTax = (state: CartStore) => 
  getSubtotal(state) * TAX_RATE;

const getDeliveryFee = (state: CartStore) => 
  getSubtotal(state) > 0 ? DELIVERY_FEE : 0;

const getDiscount = (state: CartStore) => {
  const subtotal = getSubtotal(state);
  if (state.promoCode.toUpperCase() === 'FLAT10') {
    return subtotal * 0.1; // 10% discount
  } else if (state.promoCode.toUpperCase() === 'SAVE20') {
    return Math.min(subtotal * 0.2, 100); // 20% discount max ₹100
  } else if (state.promoCode.toUpperCase() === 'FIRST50') {
    return Math.min(50, subtotal); // Flat ₹50 off
  }
  return 0;
};

const getTotal = (state: CartStore) => {
  const subtotal = getSubtotal(state);
  const tax = getTax(state);
  const deliveryFee = getDeliveryFee(state);
  const discount = getDiscount(state);
  return subtotal + tax + deliveryFee - discount;
};

const getTotalItems = (state: CartStore) => 
  state.items.reduce((total, item) => total + item.quantity, 0);

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],
      promoCode: '',
      deliveryTime: '30 mins',
      paymentMethod: '',

      addItem: (newItem) => {
        set((state) => {
          const itemToAdd = 'quantity' in newItem ? newItem : { ...newItem, quantity: 1 };
          const existingItem = state.items.find((item) => item.id === itemToAdd.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === itemToAdd.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, itemToAdd],
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], promoCode: '' });
      },

      setPromoCode: (code) => {
        set({ promoCode: code });
      },

      setDeliveryTime: (time) => {
        set({ deliveryTime: time });
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },

      applyPromoCode: (code) => {
        const currentSubtotal = getSubtotal(get());
        const currentDiscount = getDiscount(get());
        
        if (currentDiscount > 0) {
          set({ promoCode: code });
          return true;
        }
        
        return false;
      },

      placeOrder: () => {
        const { items, promoCode, deliveryTime, paymentMethod } = get();
        if (items.length === 0) return null;

        const order: Order = {
          id: `ORD-${Date.now()}`,
          items: [...items],
          subtotal: getSubtotal(get()),
          tax: getTax(get()),
          deliveryFee: getDeliveryFee(get()),
          total: getTotal(get()),
          timestamp: new Date(),
          status: 'pending',
        };

        set((state) => ({
          orders: [order, ...state.orders],
          items: [],
          promoCode: '',
          deliveryTime: '30 mins',
          paymentMethod: '',
        }));

        return order.id;
      },
    }),
    {
      name: 'foodiehub-cart',
    }
  )
);

// Reactive selectors - these automatically update when state changes
export const useCartTotals = () => {
  const store = useCartStore();
  return {
    subtotal: getSubtotal(store),
    tax: getTax(store),
    deliveryFee: getDeliveryFee(store),
    discount: getDiscount(store),
    total: getTotal(store),
    totalItems: getTotalItems(store),
    hasItems: store.items.length > 0,
  };
};

export const useCartItems = () => useCartStore((state) => state.items);
export const usePromoCode = () => useCartStore((state) => state.promoCode);
export const useDeliveryTime = () => useCartStore((state) => state.deliveryTime);
export const usePaymentMethod = () => useCartStore((state) => state.paymentMethod);
