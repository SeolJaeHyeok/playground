import { CartProduct } from "@/type/product";
import { createStore } from "zustand";

export interface CartProps {
  products: CartProduct[];
}

export interface CartState extends CartProps {
  addProduct: (product: CartProduct) => void;
  removeProduct: (orderId: string) => void;
}

export type CartStore = ReturnType<typeof createCartStore>;

export const createCartStore = (initProps?: Partial<CartProps>) => {
  const DEFAULT_PROPS: CartProps = {
    products: [],
  };
  return createStore<CartState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addProduct: (product: CartProduct) =>
      set((state) => ({
        products: [...state.products, product],
      })),
    removeProduct: (orderId: string) =>
      set((state) => ({
        products: state.products.filter((product) => product.id !== orderId),
      })),
  }));
};
