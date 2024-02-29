"use client";
import React from "react";
import useStore from "@/hooks/olx-products";

const Products = () => {
  const products = useStore((state: any) => state.products);

  return (
    <div className="w-full">
      {products?.length > 0 ? (
        <div className="space-y-4">
          {products?.map((product: any, index: number) =>
            product?.title ? (
              <div
                key={index}
                className="border-4 border-neutral-200 bg-white p-5 rounded-lg"
              >
                <div className="flex w-full items-top justify-between">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product?.title}
                  </h3>
                  <a
                    href={product?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-gray-100 border px-3 py-1 ml-2 rounded-md h-[35px]"
                  >
                    🔗
                  </a>
                </div>
                <p className="text-md font-medium text-gray-500">
                  {product?.price}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  {product?.description}
                </p>
                <div className="mt-3">
                  <div className="flex flex-row w-full gap-2 flex-wrap">
                    {product?.features?.map(
                      (feature: any, featureIndex: number) => (
                        <span
                          className="p-2 text-sm bg-blue-700 rounded-lg text-white inline-block"
                          key={featureIndex}
                        >
                          {feature}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}
    </div>
  );
};

export default Products;
