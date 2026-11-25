import { StarIcon } from "lucide-react";
import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductType } from "@/models/product";

type ProductDetailProps = {
  product: ProductType;
  related: ProductType[];
};

export default function ProductDetail({
  product,
  related,
}: ProductDetailProps) {
  const details = [
    { label: "Envio", value: product.shippingInformation },
    { label: "Garantia", value: product.warrantyInformation },
    { label: "Devolução", value: product.returnPolicy },
    { label: "SKU", value: product.sku, desktopOnly: true },
  ];

  return (
    <div className="flex flex-col gap-8 pb-4 md:gap-12 md:py-6">
      <div className="flex flex-col gap-5">
        <nav
          aria-label="Trilha"
          className="hidden flex-wrap gap-2 text-sm text-muted-foreground md:flex"
        >
          <Link
            prefetch={false}
            href="/"
            className="underline underline-offset-4"
          >
            Início
          </Link>
          <span aria-hidden>/</span>
          <Link
            prefetch={false}
            href="/products"
            className="underline underline-offset-4"
          >
            Calçados masculinos
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-12">
          <div className="-mx-4 flex min-w-0 flex-col gap-3 md:mx-0">
            <div className="relative overflow-hidden bg-image md:rounded-2xl">
              <img
                src={product.images[0]}
                alt={product.title}
                className="block w-full"
              />
              <span className="absolute top-4 left-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground">
                −4%
              </span>
              <div className="absolute inset-x-0 bottom-2 flex justify-center md:hidden">
                {product.images.map((image, index) => (
                  <span
                    key={image}
                    className="flex size-8 items-center justify-center"
                  >
                    <span
                      className={cn(
                        "h-2 rounded-full",
                        index === 0 ? "w-6 bg-primary" : "w-2 bg-zinc-400",
                      )}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden grid-cols-4 gap-3 md:grid">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Ver imagem ${index + 1}`}
                  className={cn(
                    "overflow-hidden rounded-lg border-2 bg-image transition-colors",
                    index === 0
                      ? "border-primary"
                      : "border-transparent hover:border-zinc-300",
                  )}
                >
                  <img src={image} alt="" className="block w-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {product.brand} · Calçados masculinos
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {product.title}
              </h1>
              <a
                href="#reviews"
                className="flex min-h-8 items-center gap-1.5 text-sm text-zinc-700"
              >
                <StarIcon
                  className="size-4 fill-current text-foreground"
                  aria-hidden
                />
                <span className="font-semibold text-foreground">4,8</span> de 5
                · <span className="underline">ver avaliações</span>
              </a>
            </div>

            <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
              <span className="font-display text-4xl font-bold tracking-tight">
                US$ 143,81
              </span>
              <span className="text-sm text-muted-foreground line-through md:text-base">
                US$ 149,99
              </span>
              <span className="hidden rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-brand md:inline">
                4% off
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-success" />
              <span>
                <strong className="font-semibold">Em estoque</strong> · restam 7
                unidades
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 md:hidden">
              <span className="text-sm font-medium">Quantidade</span>
              <QuantitySelector value={1} label="Quantidade" />
            </div>

            <div className="hidden flex-wrap items-center gap-3 md:flex">
              <QuantitySelector value={1} label="Quantidade" />
              <Button variant="brand" size="xl" className="min-w-56 flex-1">
                Adicionar ao carrinho
              </Button>
            </div>

            <dl className="flex flex-col border-t">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className={cn(
                    "flex justify-between gap-4 border-b py-3 text-sm",
                    detail.desktopOnly && "hidden md:flex",
                  )}
                >
                  <dt className="text-muted-foreground">{detail.label}</dt>
                  <dd className="text-right font-medium">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-bold md:text-3xl md:tracking-tight">
            Descrição
          </h2>
          <p className="text-base leading-relaxed text-zinc-700">
            {product.description}
          </p>
          <div className="mt-1 hidden flex-wrap gap-2 md:flex">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 text-sm text-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div id="reviews" className="flex scroll-mt-4 flex-col gap-3">
          <h2 className="font-display text-xl font-bold md:text-3xl md:tracking-tight">
            Avaliações
          </h2>
          {product.reviews.map((review) => (
            <article
              key={review.reviewerName}
              className="flex flex-col gap-1.5 rounded-xl border bg-card p-4"
            >
              <div className="flex justify-between gap-2 text-sm">
                <span className="font-semibold">{review.reviewerName}</span>
                <span className="flex items-center gap-1 text-zinc-700">
                  <StarIcon className="size-3.5 fill-current" aria-hidden />
                  {review.rating}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-700">
                {review.comment}
              </p>
              <span className="text-xs text-muted-foreground">
                {review.date.slice(0, 10)}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 md:gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-bold md:text-3xl md:tracking-tight">
            Mais em calçados masculinos
          </h2>
          <Link
            prefetch={false}
            href="/products"
            className="hidden py-3 text-sm font-medium underline underline-offset-4 md:inline"
          >
            Ver todos
          </Link>
        </div>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              compactOnMobile
              className="w-40 shrink-0 md:w-auto"
            />
          ))}
        </div>
      </section>

      <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex items-center gap-3 border-t bg-card px-4 pt-3 pb-6 md:hidden">
        <div className="flex shrink-0 flex-col">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="font-display text-xl font-bold">US$ 143,81</span>
        </div>
        <Button
          variant="brand"
          size="xl"
          className="min-w-0 flex-1 px-3 leading-tight whitespace-normal"
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}
