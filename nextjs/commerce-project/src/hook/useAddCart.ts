import { useCartContext } from "@/components/providers/ZustandProvider";
import { CartProduct } from "@/type/product";

export const useAddCart = () => {
  const addProduct = useCartContext((state) => state.addProduct);

  const addProductToCart = async (item: CartProduct) => {
    addProduct(item);
  };

  return { addProductToCart };
};
