"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductCategory from "@/components/ProductCategory";
import { mockCategories } from "@/mocks/categories";
import { ProductType } from "@/models/product";

function SectionHeader({
  title,
  linkLabel,
}: {
  title: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>
      <Link
        prefetch={false}
        href="/products"
        className="py-3 text-sm font-medium underline underline-offset-4"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

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

      <section className="flex flex-col gap-3 py-4 md:gap-5 md:py-6">
        <SectionHeader title="Categorias" linkLabel="Ver todas" />
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 lg:grid-cols-5">
          {mockCategories.map((category) => (
            <ProductCategory key={category.slug} label={category.label} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 py-4 md:gap-5 md:py-6">
        <SectionHeader title="Maiores descontos" linkLabel="Ver todos" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {products?.slice(0, 4).map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3 py-4 md:gap-5 md:py-6">
        <SectionHeader title="Mais bem avaliados" linkLabel="Ver todos" />
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
          {products?.slice(4, 8).map((product) => {
            return (
              <ProductCard
                product={product}
                compactOnMobile
                showDiscount={false}
                className="w-40 shrink-0 md:w-auto"
                key={product.id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
