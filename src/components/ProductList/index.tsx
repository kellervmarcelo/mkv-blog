"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { getPageNumber } from "@/lib/pagination";

import productsService, { ProductsResponse } from "@/service/ProductsService";
import { cn } from "cn";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
const ITEMS_PER_PAGE = 12;

type ErrorReason = "network" | "unknown";

type ProductsPageState =
  | { status: "loading" }
  | {
      status: "success";
      data: Pick<ProductsResponse, "products" | "total">;
      skip: number;
    }
  | { status: "error"; reason: ErrorReason };

const ERROR_MESSAGES: Record<
  ErrorReason,
  { title: string; description: string }
> = {
  network: {
    title: "Sem conexão",
    description: "Verifique sua internet e tente novamente.",
  },
  unknown: {
    title: "Não foi possível carregar os produtos",
    description: "Algo deu errado do nosso lado. Tente novamente em instantes.",
  },
};

export default function ProductList() {
  const [pageState, setPageState] = useState<ProductsPageState>({
    status: "loading",
  });
  const [retryCount, setRetryCount] = useState(0);

  function handleRetry() {
    setPageState({ status: "loading" });
    setRetryCount((count) => count + 1);
  }

  const pageNumber = getPageNumber(useSearchParams().get("page"));

  const skip = ITEMS_PER_PAGE * (pageNumber - 1);
  const totalPages =
    pageState.status === "success"
      ? Math.ceil(pageState.data.total / ITEMS_PER_PAGE)
      : 0;

  const isChangingPage =
    pageState.status === "success" && pageState.skip !== skip;

  useEffect(() => {
    const abortController = new AbortController();

    async function getProducts() {
      try {
        const { products, total } = await productsService.listProducts(
          abortController.signal,
          {
            limit: ITEMS_PER_PAGE,
            skip,
          },
        );

        setPageState({
          status: "success",
          data: {
            products,
            total,
          },
          skip,
        });
      } catch (error) {
        if (abortController.signal.aborted) return;

        if (error instanceof TypeError && !navigator.onLine) {
          setPageState({ status: "error", reason: "network" });
          return;
        }

        setPageState({ status: "error", reason: "unknown" });
      }
    }

    getProducts();

    return () => {
      abortController.abort();
    };
  }, [skip, retryCount]);

  return (
    <div className="flex min-w-0 flex-col gap-7 lg:col-span-3">
      {pageState.status === "loading" && (
        <Loading label="Carregando produtos..." />
      )}

      {pageState.status === "error" && (
        <ErrorState
          title={ERROR_MESSAGES[pageState.reason].title}
          description={ERROR_MESSAGES[pageState.reason].description}
          onRetry={handleRetry}
        />
      )}

      <div className="relative">
        <div
          aria-busy={isChangingPage}
          className={cn(
            "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5",
            isChangingPage && "pointer-events-none opacity-50",
          )}
        >
          {pageState.status === "success" &&
            pageState.data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {isChangingPage && (
          <div className="absolute inset-0 flex items-start justify-center pt-24">
            <Loading label="Carregando página..." />
          </div>
        )}
      </div>

      {pageState.status === "success" && (
        <>
          <div className="flex flex-col items-center gap-2 lg:hidden">
            <span className="text-sm text-muted-foreground">
              Mostrando {pageState.data.products.length} de{" "}
              {pageState.data.total}
            </span>
            <Button variant="outline" className="w-full">
              Carregar mais
            </Button>
          </div>

          <nav
            aria-label="Paginação"
            className="hidden flex-wrap items-center justify-center gap-1.5 lg:flex"
          >
            {pageNumber === 1 ? (
              <Button variant="outline" disabled>
                Anterior
              </Button>
            ) : (
              <Link
                href={{
                  pathname: "/products",
                  query: { page: pageNumber - 1 },
                }}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                )}
              >
                Anterior
              </Link>
            )}
            {Array.from({ length: totalPages }).map((_, index) => {
              const isCurrentPage = index + 1 === pageNumber;

              return (
                <Link
                  key={index + 1}
                  className={cn(
                    buttonVariants({
                      variant: isCurrentPage ? "default" : "outline",
                      size: "icon",
                    }),
                  )}
                  aria-current={isCurrentPage ? "page" : undefined}
                  href={{ pathname: "/products", query: { page: index + 1 } }}
                >
                  {index + 1}
                </Link>
              );
            })}
            {pageNumber >= totalPages ? (
              <Button variant="outline" disabled>
                Próxima
              </Button>
            ) : (
              <Link
                href={{
                  pathname: "/products",
                  query: { page: pageNumber + 1 },
                }}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                )}
              >
                Próxima
              </Link>
            )}
          </nav>
        </>
      )}
    </div>
  );
}
