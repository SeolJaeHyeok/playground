export type Product = {
  id: number;
  availableForSale: boolean;
  isNew: boolean;
  title: string;
  description: string;
  options: {
    name: string;
    values: string[];
  }[];
  price: {
    amount: string;
    currencyCode: string;
  };
  images: string;
  seo: {
    title: string;
    description: string;
  };
  tags: string[];
  rating: number;
};

export type CartProduct = {
  id: string;
  product: Product;
  quantity: number;
  option: string;
};

export type SupabseProduct = {
  id: number;
  is_new: boolean;
  price_amount: number;
  seo_title: string;
  seo_description: string;
  title: string;
  description: string;
  image_url?: string;
  rating: number;
};

export const camelizeProduct = (data: SupabseProduct): Product => {
  return {
    id: data.id,
    isNew: data.is_new,
    price: {
      amount: data.price_amount.toString(),
      currencyCode: "KRW",
    },
    seo: {
      title: data.seo_title,
      description: data.seo_description,
    },
    title: data.title,
    images: data.image_url ?? "",
    description: data.description,
    tags: [data.title],
    availableForSale: true,
    rating: data.rating,
    options: [
      {
        name: "Size",
        values: ["S", "M"],
      },
    ],
  };
};
