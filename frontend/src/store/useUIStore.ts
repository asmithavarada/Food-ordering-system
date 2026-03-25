import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ToastMessage } from '../types';

interface UIStore {
  isDarkMode: boolean;
  isCartOpen: boolean;
  searchQuery: string;
  selectedCategory: 'all' | 'veg' | 'non-veg';
  toasts: ToastMessage[];
  toggleDarkMode: () => void;
  toggleCart: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: 'all' | 'veg' | 'non-veg') => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      isCartOpen: false,
      searchQuery: '',
      selectedCategory: 'all',
      toasts: [],

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      toggleCart: () => {
        set((state) => ({ isCartOpen: !state.isCartOpen }));
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast = { ...toast, id };
        
        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        const duration = toast.duration || 3000;
        setTimeout(() => {
          get().removeToast(id);
        }, duration);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },
    }),
    {
      name: 'foodiehub-ui',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
