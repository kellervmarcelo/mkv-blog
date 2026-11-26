"use client";

import { SlidersHorizontalIcon, XIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mockCategories } from "@/mocks/categories";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";

const SORT_OPTIONS = [
  "Relevância",
  "Menor preço",
  "Maior preço",
  "Melhor avaliação",
  "Maior desconto",
];

function FilterTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
      {children}
    </span>
  );
}

function SortSelect({ id, className }: { id: string; className?: string }) {
  return (
    <select
      id={id}
      className={cn(
        "h-11 rounded-md border bg-card px-3 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function PriceAndOtherFilters({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      <div className="flex flex-col gap-3 border-t pt-5 lg:gap-2">
        <FilterTitle>Preço (US$)</FilterTitle>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${idPrefix}-min`} className="text-sm font-medium">
              Mínimo
            </label>
            <input
              id={`${idPrefix}-min`}
              inputMode="decimal"
              placeholder="0"
              className="h-11 w-full min-w-0 rounded-md border bg-card px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${idPrefix}-max`} className="text-sm font-medium">
              Máximo
            </label>
            <input
              id={`${idPrefix}-max`}
              inputMode="decimal"
              placeholder="Sem limite"
              className="h-11 w-full min-w-0 rounded-md border bg-card px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t pt-5">
        <FilterTitle>Outros</FilterTitle>
        <label className="flex min-h-11 items-center gap-2 text-base lg:min-h-8 lg:text-sm">
          <input type="checkbox" className="size-4 accent-primary" />
          Nota 4 ou mais
        </label>
        <label className="flex min-h-11 items-center gap-2 text-base lg:min-h-8 lg:text-sm">
          <input type="checkbox" className="size-4 accent-primary" />
          Com desconto acima de 10%
        </label>
        <label className="flex min-h-11 items-center gap-2 text-base lg:min-h-8 lg:text-sm">
          <input
            type="checkbox"
            defaultChecked
            className="size-4 accent-primary"
          />
          Somente em estoque
        </label>
      </div>
    </>
  );
}

export default function Products() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-5 md:py-6">
      <nav
        aria-label="Trilha"
        className="flex gap-2 text-sm text-muted-foreground"
      >
        <Link
          prefetch={false}
          href="/"
          className="underline underline-offset-4"
        >
          Início
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">Produtos</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Todos os produtos
          </h1>
          <span className="text-sm text-muted-foreground">62 produtos</span>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <label htmlFor="sort-desktop" className="text-sm font-medium">
            Ordenar por
          </label>
          <SortSelect id="sort-desktop" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:hidden">
        <Sheet>
          <SheetTrigger
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            <SlidersHorizontalIcon />
            Filtros
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-11/12">
            <div className="flex justify-center pt-2">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between border-b py-2 pr-2 pl-4">
              <SheetTitle className="font-display text-xl font-bold">
                Filtros
              </SheetTitle>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="h-11 px-3 text-sm font-medium text-zinc-700 underline underline-offset-4"
                >
                  Limpar
                </button>
                <SheetClose
                  aria-label="Fechar filtros"
                  className="flex size-11 items-center justify-center rounded-md hover:bg-accent"
                >
                  <XIcon className="size-6" aria-hidden />
                </SheetClose>
              </div>
            </div>

            <div className="flex grow flex-col gap-6 overflow-y-auto px-4 py-5">
              <div className="flex flex-col gap-3">
                <FilterTitle>Categoria</FilterTitle>
                <div className="flex flex-wrap gap-2">
                  {mockCategories.map((category) => (
                    <button
                      key={category.slug}
                      type="button"
                      className="h-9 rounded-full border bg-card px-3 text-sm font-medium"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              <PriceAndOtherFilters idPrefix="sheet" />
            </div>

            <div className="border-t px-4 pt-3 pb-6">
              <SheetClose
                className={cn(
                  buttonVariants({ variant: "brand", size: "xl" }),
                  "w-full",
                )}
              >
                Ver 62 produtos
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        <label htmlFor="sort-mobile" className="sr-only">
          Ordenar por
        </label>
        <SortSelect id="sort-mobile" className="w-full" />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:hidden">
        <button
          type="button"
          aria-label="Remover filtro Em estoque"
          className="flex h-8 shrink-0 items-center gap-1 rounded-full bg-primary pr-2 pl-3 text-sm font-medium text-primary-foreground"
        >
          Em estoque
          <XIcon className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          className="h-8 shrink-0 px-3 text-sm font-medium text-zinc-700 underline underline-offset-4"
        >
          Limpar
        </button>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-4">
        <aside aria-label="Filtros" className="hidden flex-col gap-5 lg:flex">
          <div className="flex flex-col gap-1">
            <span className="mb-1">
              <FilterTitle>Categoria</FilterTitle>
            </span>
            <button
              type="button"
              className="flex min-h-10 items-center justify-between rounded-lg bg-primary px-3 text-left text-sm font-semibold text-primary-foreground"
            >
              Todas
              <span className="font-medium text-brand">62</span>
            </button>
            {mockCategories.map((category) => (
              <button
                key={category.slug}
                type="button"
                className="flex min-h-10 items-center justify-between rounded-lg px-3 text-left text-sm font-medium transition-colors hover:bg-accent"
              >
                {category.label}
                <span className="text-muted-foreground">{category.count}</span>
              </button>
            ))}
          </div>
          <PriceAndOtherFilters idPrefix="aside" />
        </aside>

        <Suspense>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}
