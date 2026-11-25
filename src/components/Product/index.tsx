"use client";

import NotFound from "@/app/not-found";
import ProductDetail from "@/components/ProductDetail";
import { mockProducts } from "@/mocks";
import { ProductType } from "@/models/product";
import { useEffect, useState } from "react";

type ProductPageState =
  | { status: "loading" }
  | { status: "success"; product: ProductType }
  | { status: "not-found" }
  | { status: "error"; message: string };

export default function Product({ id }: { id: string }) {
  const [pageState, setPageState] = useState<ProductPageState>({
    status: "loading",
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function getProduct(id: string) {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: abortController.signal,
        });
        const contentType = response.headers.get("content-type");

        if (response.status === 404) {
          setPageState({ status: "not-found" });
          return;
        }

        if (!response.ok) {
          throw new Error();
        }

        let product: ProductType;
        if (contentType?.includes("application/json")) {
          product = await response.json();
          setPageState({ status: "success", product });
        } else {
          setPageState({
            status: "error",
            message: "Resposta incorreta do servidor",
          });
        }
      } catch {
        if (abortController.signal.aborted) return;
        setPageState({ status: "error", message: "Erro encontrado" });
      }
    }

    getProduct(id);

    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <>
      {pageState.status === "loading" && <h1>Loading</h1>}
      {pageState.status === "not-found" && <NotFound />}
      {pageState.status === "success" && (
        <ProductDetail
          product={pageState.product}
          related={mockProducts.slice(1, 5)}
        />
      )}

      {pageState.status === "error" && <h1>{pageState.message}</h1>}
    </>
  );
}
