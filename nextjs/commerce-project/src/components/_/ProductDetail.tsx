"use client";
import { useCount } from "@/hook/useCount";
import { Product } from "@/type/product";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import RatingStar from "../RatingStar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddCart } from "@/hook/useAddCart";

type Props = {
  product: Product;
  isLogin?: boolean;
};

const ProductDetail = ({ product, isLogin = false }: Props) => {
  const { count, onPlus, onMinus } = useCount();
  const [selectedOption, setOption] = useState<string>();

  const router = useRouter();
  const { addProductToCart } = useAddCart();

  const handleAddCart = async () => {
    if (!isLogin) {
      return router.push("/sign-in");
    }

    if (count > 1 && selectedOption) {
      addProductToCart({
        id: crypto.randomUUID(),
        product: product,
        option: selectedOption,
        quantity: count,
      });
    }
  };

  return (
    <section className="max-w-screen-xl min-h-screen pt-[60px] px-[60px] m-auto">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-2 flex justify-center">
          <Image
            width={350}
            height={350}
            src={product.images}
            alt={product.title}
            className="w-[350px] rounded-sm object-cover"
          />
        </div>
        <div className="col-span-2 flex flex-col w-full  gap-8 p-5">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div>
              <p className="text-sm">{product.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <RatingStar rating={product.rating} />
                <p className="text-2xl">{product.price.amount}$</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="flex flex-col gap-5 p-4">
              <div className="flex items-center justify-between">
                <div>Price : </div>
                <div>
                  <p className="text-2xl">{product.price.amount}$</p>
                </div>
              </div>
              <div>
                {product.options.map((option) => (
                  <div
                    key={option.name}
                    className="flex flex-col gap-2 justify-between"
                  >
                    <div>{option.name}</div>
                    <div className="flex gap-1 flex-wrap">
                      {option.values.map((value) => (
                        <Button
                          key={value}
                          onClick={() => setOption(value)}
                          variant={
                            selectedOption === value ? "default" : "outline"
                          }
                          className="w-max px-2 py-1 h-max"
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 items-center">
                <Button
                  variant={"outline"}
                  className="w-max px-2 py-2 h-max"
                  onClick={onMinus}
                >
                  <MinusIcon size={16} />
                </Button>
                {count}
                <Button
                  variant={"outline"}
                  className="w-max px-2 py-2 h-max"
                  onClick={onPlus}
                >
                  <PlusIcon size={16} />
                </Button>
              </div>
              <div className=" flex-center">
                <Button onClick={handleAddCart}>Add To Cart</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
