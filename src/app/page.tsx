"use client";

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
    <div>
      {products?.map((product) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </div>
  );
}
