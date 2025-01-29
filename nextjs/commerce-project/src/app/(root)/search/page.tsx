import { getProducts } from "@/services/server-action";
import ProductList from "@/components/ProductList";

import { SearchQueryParams } from "@/type/search";

type SearchProps = {
  params: {};
  searchParams: SearchQueryParams;
};

const SearchPage = async ({ searchParams }: SearchProps) => {
  const { data } = await getProducts(searchParams);
  return <ProductList products={data} />;
};

export default SearchPage;
