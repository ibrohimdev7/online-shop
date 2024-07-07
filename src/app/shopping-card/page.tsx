"use client";

import React, { useEffect, useState } from "react";

import CustomImage from "@/components/image";
import { ProductType } from "@/interfaces";
import ReactStars from "react-stars";
import EmptyCart from "@/components/empty-cart";

const ShoppingCard = () => {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );
  const removeProduct = (id: number) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    localStorage.setItem("carts", JSON.stringify(updatedProducts));

    setProducts(updatedProducts);
  };

  const handleIncrement = (id: number) => {
    const updatedProducts = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          quantity: p.quantity + 1,
        };
      }

      return p;
    });

    localStorage.setItem("carts", JSON.stringify(updatedProducts));

    setProducts(updatedProducts);
  };

  const handleDecrement = (id: number) => {
    const findProduct = products.find((p) => p.id === id);

    if (findProduct?.quantity === 1) {
      return removeProduct(id);
    } else {
      const updatedProducts = products.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }

        return p;
      });

      localStorage.setItem("carts", JSON.stringify(updatedProducts));

      setProducts(updatedProducts);
    }
  };

  useEffect(() => {
    const total = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    setTotal(total);
  }, [products]);

  return products.length > 0 ? (
    <div className="bg-gray-100 pb-24 pt-32 md:h-screen">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {products.map((product, index) => (
            <div
              key={index}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <div className="relative w-60 h-60 sm:h-auto mx-auto">
                <CustomImage product={product} fill />
              </div>
              <div className="sm:ml-4 sm:w-full space-y-10">
                <div className="mt-5 sm:mt-0">
                  <h2
                    className="text-lg font-bold text-gray-900 line-clamp-1"
                    title={product?.title}
                  >
                    {product?.title}
                  </h2>
                  <p
                    className="mt-1 text-xs text-gray-700 line-clamp-2"
                    title={product?.description}
                  >
                    {product?.description}
                  </p>
                </div>
                <div className="flex items-center text-sm my-4">
                  <p>{product?.rating?.rate}</p>
                  {product?.rating?.rate && (
                    <div className="flex items-center ml-2 mr-6">
                      <ReactStars value={product?.rating?.rate} edit={false} />
                    </div>
                  )}
                  <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                    See all {product?.rating?.count} reviews
                  </p>
                </div>
                <div className="mt-4 flex justify-between sm:mt-0 items-center sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleDecrement(product?.id)}
                    >
                      {" "}
                      -{" "}
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={product?.quantity}
                      min="1"
                    />
                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleIncrement(product?.id)}
                    >
                      {" "}
                      +{" "}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {(product.price * product?.quantity)?.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      )}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => removeProduct(product?.id)}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">
              {(10).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {(total + 10).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-4 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
};

export default ShoppingCard;
