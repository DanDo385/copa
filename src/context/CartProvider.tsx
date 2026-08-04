"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Cart, CartItem } from "@/lib/types";

interface CartContextValue {
  cart: Cart;
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "line_id">) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
}

const defaultCart: Cart = {
  items: [],
  gift_option_enabled: false,
  free_shipping_threshold: 150,
  free_shipping_threshold_is_demo: true,
  currency: "USD",
};

const CartContext = createContext<CartContextValue | null>(null);

function generateLineId(): string {
  return `line_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    [cart.items],
  );

  const subtotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart.items],
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((item: Omit<CartItem, "line_id">) => {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.variant_id === item.variant_id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.variant_id === item.variant_id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }
      return {
        ...prev,
        items: [...prev.items, { ...item, line_id: generateLineId() }],
      };
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.line_id !== lineId),
    }));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.line_id === lineId ? { ...i, quantity } : i,
      ),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart((prev) => ({ ...prev, items: [] }));
  }, []);

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      cart,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
