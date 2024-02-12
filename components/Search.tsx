"use client";
import React from "react";
import { FormEvent, useState } from "react";
import {
  exportData,
  scrapeOlxProducts,
} from "@/actions/scrape-products-puppeteer";
import useStore from "@/hooks/olx-products";

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addProduct = useStore((state: any) => state.addProduct);
  const products = useStore((state: any) => state.products);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const product = await scrapeOlxProducts(searchPrompt);
      console.log(product);
      addProduct(product);
      setSearchPrompt("");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const exportProducts = async () => {
    try {
      await exportData(products);
      alert("Exported");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full items-left gap-3">
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="w-full p-3 border-4 border-neutral-200 rounded-lg text-gray-500"
      />
      <div className="flex gap-2 flex-2">
        <button
          onClick={handleSubmit}
          className={`${
            searchPrompt !== "" && !isLoading ? "cursor-pointer" : ""
          } bg-gray-800 w-[150px] disabled:bg-gray-400 rounded-md px-5 py-3 text-white`}
          disabled={searchPrompt === "" || isLoading}
        >
          {isLoading ? "Scraping..." : "Scrape"}
        </button>
        <button
          disabled={!products?.length || isLoading}
          onClick={exportProducts}
          className={`bg-gray-800 disabled:bg-gray-400 ${
            products?.length && !isLoading ? "cursor-pointer" : ""
          } rounded-md shadow-xs px-5 py-3 text-white`}
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
