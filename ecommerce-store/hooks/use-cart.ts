import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  getItems: () => Product[];
}

// 👇 factory function to create a unique cart store for a specific username
export const createCartStore = (username: string) =>
  create<CartStore>()(
    persist(
      (set, get) => ({
        items: [],
        addItem: (data: Product) => {
          const currentItems = get().items;
          const existingItem = currentItems.find((item) => item.id === data.id);

          if (existingItem) {
            return toast('Item already in cart.');
          }

          set({ items: [...currentItems, data] });
          toast.success('Item added to cart.');
        },
        removeItem: (id: string) => {
          set({ items: get().items.filter((item) => item.id !== id) });
          toast.success('Item removed from cart.');
        },
        removeAll: () => set({ items: [] }),
        getItems: () => get().items,
      }),
      {
        name: `cart-${username}`, // ✅ cart key specific to the user
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
