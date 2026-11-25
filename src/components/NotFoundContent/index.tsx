import { SearchIcon } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

const POPULAR_CATEGORIES = ["Calçados", "Smartphones", "Perfumes", "Notebooks"];

export default function NotFoundContent() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center md:py-20">
      <div
        aria-hidden
        className="flex items-center gap-3 font-display text-8xl leading-none font-bold tracking-tighter md:gap-4 md:text-9xl"
      >
        <span>4</span>
        <span className="rounded-3xl bg-brand px-5 pb-3 text-brand-foreground md:px-6">
          0
        </span>
        <span>4</span>
      </div>
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
        Essa página saiu de estoque
      </h1>
      <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
        O link pode estar quebrado, ou o produto não existe mais no catálogo.
        Tente buscar ou volte para o início.
      </p>

      <div className="flex w-full max-w-md flex-col gap-2 text-left">
        <label htmlFor="not-found-search" className="text-sm font-medium">
          Buscar produtos
        </label>
        <div className="flex gap-2">
          <div className="relative grow">
            <SearchIcon
              className="absolute top-3 left-3 size-5 text-zinc-500"
              aria-hidden
            />
            <input
              id="not-found-search"
              placeholder="Ex.: tênis, perfume, notebook"
              className="h-11 w-full rounded-md border bg-card pr-3 pl-10 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            />
          </div>
          <Button type="button">Buscar</Button>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link
          prefetch={false}
          href="/"
          className={buttonVariants({ variant: "brand", size: "lg" })}
        >
          Voltar ao início
        </Link>
        <Link
          prefetch={false}
          href="/products"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Ver todos os produtos
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="mb-1 w-full text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Categorias populares
        </span>
        {POPULAR_CATEGORIES.map((category) => (
          <Link
            key={category}
            prefetch={false}
            href="/products"
            className="flex h-9 items-center rounded-full border bg-card px-4 text-sm transition-colors hover:bg-accent"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
