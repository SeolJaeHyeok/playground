"use client";

import { useContext, useRef } from "react";
import {
  CartProps,
  CartState,
  CartStore,
  createCartStore,
} from "@/store/cartStore";
import { createContext } from "react";
import { useStore } from "zustand";

export function useCartContext<T>(selector: (state: CartState) => T): T {
  const store = useContext(CartContext);
  if (!store) throw new Error("Missing CartContext.Provider in the tree");
  return useStore(store, selector);
}

export const CartContext = createContext<CartStore | null>(null);

type CartProviderProps = React.PropsWithChildren;
export function CartProvider({ children, ...props }: CartProviderProps) {
  const storeRef = useRef<CartStore>();
  if (!storeRef.current) {
    storeRef.current = createCartStore(props);
  }
  return (
    <CartContext.Provider value={storeRef.current}>
      {children}
    </CartContext.Provider>
  );
}
