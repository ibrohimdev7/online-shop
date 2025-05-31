import Hero from "@/components/hero";
import Products from "@/components/products";
import { ProductType } from "@/interfaces";

const Home = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: ProductType[] = await res.json();

  return (
    <main className="container mx-auto px-8 xl:px-0">
      <Hero />

      <section className="flex flex-col space-y-12">
        <h1 className="text-xl sm:text-5xl font-bold text-center uppercase">
          Halal shop deals (Test)
        </h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <Products key={product?.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
