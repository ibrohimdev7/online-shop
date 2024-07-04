import { ProductType } from "@/interfaces";
import Image from "next/image";
import React from "react";

const Products = ({ product }: { product: ProductType }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <img
        className="h-40 rounded w-full object-cover object-center mb-6"
        src="https://dummyimage.com/720x400"
        alt="content"
      />
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
        {product?.category}
      </h3>
      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <p className="w-44 truncate">{product?.title}</p>
        <p>${product?.price}</p>
      </div>
      <p
        className="leading-relaxed text-base line-clamp-3"
        title={product?.description}
      >
        {product?.description}
      </p>
    </div>
  );
};

export default Products;
