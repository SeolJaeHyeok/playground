"use client";

import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/type/product";

type BannerProps = {
  products: Product[];
};

const Banner = ({ products }: BannerProps) => {
  const bannerProducts = products.slice(0, 3);

  return (
    <Carousel className="w-[75%]">
      <CarouselContent className=" h-[300px]">
        {bannerProducts.map((product) => (
          <CarouselItem key={product.id}>
            <div className="w-full h-[300px] relative">
              <div className="absolute z-10 -translate-y-1/2 -translate-x-1/2 top-[80%] left-[50%] bg-black bg-opacity-50 text-white p-2 rounded-md">
                {product.title}
              </div>
              <img
                className="w-full object-contain"
                src={product.images}
                alt={product.title}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Banner;
