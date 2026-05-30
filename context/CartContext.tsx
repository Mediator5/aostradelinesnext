"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Tradeline } from "@/types";

interface CartContextType {
  cart: Tradeline[];
  addToCart: (t: Tradeline) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Tradeline[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (tradeline: Tradeline) => {
    if (!cart.find((item) => item.id === tradeline.id)) {
      setCart([...cart, tradeline]);
    }
  };

  const removeFromCart = (id: string | number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, isCheckoutOpen, setIsCheckoutOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
