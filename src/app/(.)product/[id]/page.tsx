"use client";

import React, { useEffect, useState } from "react";

import ReactStars from "react-stars";
import { useParams, useRouter } from "next/navigation";
import { ProductType } from "@/interfaces";
import { Dialog, DialogPanel } from "@headlessui/react";
import CustomImage from "@/components/image";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [open, setOpen] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  const handleClick = () => {
    const products: ProductType[] =
      JSON.parse(localStorage.getItem("carts") as string) || [];
    const isExistProduct = products.find((p) => p.id === product?.id);

    if (isExistProduct) {
      const updatedProducts = products.map((p) => {
        if (p.id === product?.id) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }

        return p;
      });

      localStorage.setItem("carts", JSON.stringify(updatedProducts));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("carts", JSON.stringify(data));
    }

    toast.success("Product added to bag");
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const res = await fetch(`
            https://fakestoreapi.com/products/${id}
        `);

      const product = await res?.json();
      setProduct(product);
      setLoading(false);
    }

    getData();
  }, [id]);

  const onCloseDialog = () => {
    setOpen(false);

    router.back();
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={"relative z-50"}>
      <div className="fixed inset-0 bg-black/30" aria-hidden></div>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-x-8 sm:h-96">
                {product?.image && (
                  <div className="relative w-40 sm:w-72 h-60 sm:h-auto mx-auto">
                    <CustomImage product={product} fill />
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">{product?.price}</p>

                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating?.rate}</p>
                      {product?.rating?.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          <ReactStars
                            value={product?.rating?.rate}
                            edit={false}
                          />
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating?.count} reviews
                      </p>
                    </div>
                    <div className="line-clamp-5 text-sm">
                      {product?.description}
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600
                      hover:bg-transparent hover:text-blue-600"
                      onClick={handleClick}
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600
                      hover:border-transparent hover:text-white"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailPage;
