"use client";

import { Product } from "@/type/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <section className="flex flex-col gap-4 p-5 min-h-screen">
      {products.length === 0 && (
        <div className="flex m-auto justify-center items-center w-full h-full font-bold text-2xl">
          No products available
        </div>
      )}
      {products.map((product) => (
        <div className="flex border p-4 gap-4 rounded-md" key={product.id}>
          <Image
            className="rounded-sm flex-shrink-0 w-[150px] h-[150px] object-cover"
            width={150}
            height={150}
            src={product.images}
            alt={product.title}
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-sm">{product.description}</p>
              <div className="flex mt-4 items-center gap-4">
                <p className="text-2xl">{product.price.amount}$</p>
                <Link href={`/product/${product.id}`}>
                  <Button>View Product</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductList;
