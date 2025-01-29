"use client";

import Link from "next/link";
import { useCartContext } from "../providers/ZustandProvider";
import { ShoppingCartIcon } from "lucide-react";

type Props = {
  isLogin?: boolean;
};

export const CartButton = ({ isLogin = false }: Props) => {
  const products = useCartContext((state) => state.products);
  return (
    <Link
      className="h-[40px] w-[50px] border rounded-md relative flex justify-center"
      href={"/cart"}
    >
      <button className="relative">
        <ShoppingCartIcon size={40} className="p-2" />
      </button>
      {isLogin && products.length !== 0 && (
        <span className="absolute top-0 right-1 text-red-500">
          {products.length}
        </span>
      )}
    </Link>
  );
};
