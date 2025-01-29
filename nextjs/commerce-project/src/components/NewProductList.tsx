import { Card, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import RatingStar from "./RatingStar";
import { getNewProducts } from "@/services/server-action";

const NewProductList = async () => {
  const { data } = await getNewProducts();

  return (
    <>
      {data.map((product) => (
        <Card
          className="w-[240px] h-[440px] overflow-clip  border gap-4 rounded-md"
          key={product.id}
        >
          <CardHeader className="p-0">
            <Image
              className="rounded-sm w-[240px] h-[240px] object-cover"
              width={240}
              height={240}
              src={product.images}
              alt={product.title}
            />
          </CardHeader>
          <div className="flex flex-col justify-between p-5 gap-2">
            <h2 className="text-md font-medium line-clamp-1">
              {product.title}
            </h2>
            <h2 className="text-sm font-thin line-clamp-2">
              {product.description}
            </h2>
            <div className="flex justify-between items-center">
              <RatingStar rating={product.rating} />
              <div>${product.price.amount}</div>
            </div>
            <Link
              className="mt-4 flex justify-center text-center border gap-4 rounded-md"
              href={`product/${product.id}/view`}
              scroll={false}
            >
              View
            </Link>
          </div>
        </Card>
      ))}
    </>
  );
};

export default NewProductList;
