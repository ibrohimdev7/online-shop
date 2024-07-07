import Cta from "@/components/cta";
import Feature from "@/components/feature";
import Products from "@/components/products";
import { ProductType } from "@/interfaces";
import React from "react";

const ProductsPage = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: ProductType[] = await res.json();

  return (
    <div className="container mx-auto px-1 sm:px-8 xl:px-0">
      <Feature />

      <section>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <Products key={product?.id} product={product} />
          ))}
        </div>
      </section>

      <Cta />
    </div>
  );
};

export default ProductsPage;
