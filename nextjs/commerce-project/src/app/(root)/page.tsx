import { getNewProducts } from "@/services/server-action";
import Banner from "@/components/Banner";
import NewProductList from "@/components/NewProductList";

const HomePage = async () => {
  const { data } = await getNewProducts();

  return (
    <section className="m-auto flex flex-col p-4 gap-4 w-full items-center max-w-screen-lg">
      <Banner products={data} />
      <h2 className="text-xl font-bold flex-1 text-left w-full">
        New Arrivals
      </h2>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <NewProductList />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
