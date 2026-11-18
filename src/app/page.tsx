"use client";

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

  console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {products?.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}
