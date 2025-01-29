"use server";

import { camelizeProduct, Product, SupabseProduct } from "@/type/product";
import { SearchQueryParams } from "@/type/search";
import { createClient } from "@/utils/supabase/server";

export async function getProducts({
  search = "",
  category = "ALL",
}: Partial<SearchQueryParams>) {
  let result: Product[];
  const serverClient = createClient();
  const { data } = await serverClient.from("products").select();
  result = data!.map((product) => camelizeProduct(product as SupabseProduct));

  if (search) {
    result = result.filter((product) =>
      product.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  if (category !== "ALL") {
    result = result.filter((product) => product.tags.includes(category));
  }

  return { data: result };
}

export async function getNewProducts() {
  const serverClient = createClient();
  const { data } = await serverClient
    .from("products")
    .select()
    .eq("is_new", true);

  const result = data!.map((product) =>
    camelizeProduct(product as SupabseProduct)
  );

  return {
    data: result,
  };
}

export async function getProductById(id: number) {
  const serverClient = createClient();
  const { data } = await serverClient
    .from("products")
    .select()
    .eq("id", id)
    .single();

  return { data: camelizeProduct(data as SupabseProduct) };
}

export async function getCategories() {
  const serverClient = createClient();
  const { data } = await serverClient.from("products").select();

  const result = data!.map((product) =>
    camelizeProduct(product as SupabseProduct)
  );

  const categories = new Set<string>([]);
  result.forEach((product) => {
    product.tags.forEach((tag) => {
      categories.add(tag);
    });
  });

  return {
    data: Array.from(categories).map((category) => ({
      name: category,
    })),
  };
}
