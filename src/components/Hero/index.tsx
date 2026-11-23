import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp";
const HERO_TITLE = "Apple MacBook Pro 14 Inch Space Grey";

export default function Hero() {
  return (
    <section className="py-4 md:py-6">
      <div className="flex flex-col overflow-hidden rounded-3xl bg-primary text-primary-foreground md:flex-row">
        <div className="flex flex-col justify-center gap-4 p-6 md:flex-1 md:gap-5 md:px-12 md:py-14">
          <span className="self-start rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-brand-foreground md:px-3 md:py-1">
            Destaque
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Tudo em um só lugar. Do tênis ao notebook.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-zinc-300 md:text-lg">
            Calçados, roupas, acessórios, eletrônicos e perfumes, com desconto em boa parte do
            catálogo.
          </p>

          <Link prefetch={false} href="/products/78" className="overflow-hidden rounded-2xl bg-zinc-800 md:hidden">
            <img src={HERO_IMAGE} alt={HERO_TITLE} className="block w-full" />
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              prefetch={false}
              href="/products"
              className={cn(buttonVariants({ variant: "brand", size: "lg" }), "w-full md:w-auto")}
            >
              Ver produtos
            </Link>
            <Link
              prefetch={false}
              href="/products"
              className={cn(buttonVariants({ size: "lg" }), "hidden border-zinc-600 hover:bg-zinc-800 md:inline-flex")}
            >
              Maiores descontos
            </Link>
          </div>
        </div>

        <Link
          prefetch={false}
          href="/products/78"
          className="hidden flex-col justify-end gap-1.5 bg-zinc-900 p-7 md:flex md:flex-1"
        >
          <span className="flex grow items-center justify-center overflow-hidden rounded-2xl bg-zinc-800">
            <img src={HERO_IMAGE} alt={HERO_TITLE} className="block max-h-96 w-full object-contain" />
          </span>
          <span className="mt-3 text-sm text-zinc-400">Apple · Notebooks</span>
          <span className="text-xl font-semibold">{HERO_TITLE}</span>
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-brand">US$ 1.906,19</span>
            <span className="text-sm text-zinc-400 line-through">US$ 1.999,99</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
