"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "@/components/providers/ZustandProvider";
import { Badge } from "@/components/ui/badge";

const CartPage = () => {
  const { products: items, removeProduct } = useCartContext((state) => state);

  return (
    <section className="flex flex-col items-center p-5 w-full justify-start max-w-screen-lg m-auto min-h-screen py-2">
      <h1 className="self-start font-bold text-2xl mb-5">Cart</h1>
      {items.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {items.map(({ id, product, quantity, option }) => (
            <div
              key={id}
              className="flex items-center gap-4 pb-4 border-b border-white"
            >
              <div>
                <div className="font-bold text-2xl">Order Id:</div>
                <div className="text-sm">{id}</div>
              </div>
              <div className="flex items-center gap-5 flex-1">
                <Image
                  width={80}
                  height={80}
                  src={product.images}
                  alt={product.title}
                  className="w-[80px] h-[80px] object-cover flex-shrink-0"
                />
                <div className="flex-1 truncate">
                  {product.title} - ${product.price.amount}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="w-max px-2 py-1 h-max">{option}</Badge>
                  <div className="">{quantity}</div>
                </div>
                <button
                  onClick={() => removeProduct(id)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="font-bold text-2xl m-auto">
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      )}
    </section>
  );
};

export default CartPage;
