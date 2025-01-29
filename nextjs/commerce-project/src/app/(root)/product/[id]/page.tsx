import { getProductById } from "@/services/server-action";
import ProductDetail from "@/components/_/ProductDetail";

import { notFound } from "next/navigation";
import { getIsLogin } from "@/utils/supabase/server";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { data: product } = await getProductById(id);

  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.seo.title,
    description: product.seo.description,
  };
}

const ProductDetailPage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { page: string; color: string; size: string };
}) => {
  const id = parseInt(params.id, 10);
  const { data: product } = await getProductById(id);
  const isLogin = await getIsLogin();
  if (!product) notFound();

  return <ProductDetail product={product} isLogin={isLogin} />;
};

export default ProductDetailPage;
