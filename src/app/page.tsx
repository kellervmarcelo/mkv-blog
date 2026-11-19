"use client";

import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/models/product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("https://dummyjson.com/products").then(
        (res) => res.json(),
      );

      setProducts(response["products"]);
    }

    getProducts();
  }, []);

  return (
    <>
      <Hero />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {products?.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </>
  );
}
