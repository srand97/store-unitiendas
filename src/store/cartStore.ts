// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string | number;
  name: string;
  normalPrice: number;
  priceDiscount?: number; 
  image?: string
  weight?: string; 
  category?: string;
  quantity: number;
  [key: string]: any;
}

interface CartStore {
  products: CartProduct[];
  addProduct: (product: Omit<CartProduct, "quantity"> & { quantity?: number }) => void;
  removeProduct: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) => {
        const items = get().products;
        const existing = items.find((i) => i.id === product.id);

        if (existing) {
          // Si ya existe, suma la cantidad
          set({
            products: items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + (product.quantity ?? 1) } : i
            ),
          });
        } else {
          set({
            products: [...items, { ...product, quantity: product.quantity ?? 1 } as CartProduct],
          });
        }
      },

      removeProduct: (id) => set({ products: get().products.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeProduct(id);
          return;
        }
        set({
          products: get().products.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ products: [] }),

      totalItems: () => get().products.reduce((acc, i) => acc + i.quantity, 0),

      totalPrice: () => get().products.reduce((acc, i) => acc + i.normalPrice * i.quantity, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
