import { StarIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ProductType } from "@/models/product";
import {
  getDiscountBadge,
  getFormattedPrice,
  getPriceWithDiscount,
} from "@/lib/price";

type ProductCardProps = {
  product: ProductType;
  showDiscount?: boolean;
  compactOnMobile?: boolean;
  className?: string;
};

export default function ProductCard({
  product,
  showDiscount = true,
  compactOnMobile = false,
  className,
}: ProductCardProps) {
  const discountBadge = showDiscount
    ? getDiscountBadge(product.discountPercentage)
    : null;

  return (
    <Link
      prefetch={false}
      href={`/products/${product.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors duration-300 outline-none hover:border-zinc-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-image">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="block w-full transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
        {discountBadge !== null && (
          <span className="absolute top-2 left-2 rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-brand-foreground md:top-3 md:left-3">
            -{discountBadge}%
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 p-3 md:px-4 md:pt-3 md:pb-4">
        <span
          className={cn(
            "text-xs text-muted-foreground",
            compactOnMobile && "hidden md:inline",
          )}
        >
          {product.brand}
        </span>
        <h3 className="text-sm leading-snug font-semibold group-hover:underline group-hover:underline-offset-4 md:text-base">
          {product.title}
        </h3>
        <span
          className={cn(
            "items-center gap-1 text-xs text-zinc-700 md:text-sm",
            compactOnMobile ? "hidden md:flex" : "flex",
          )}
        >
          <StarIcon className="size-3.5 fill-current md:size-4" aria-hidden />
          {product.rating}
        </span>
        <div className="mt-1 flex flex-col md:flex-row md:flex-wrap md:items-baseline md:gap-2">
          <span className="font-display text-lg font-bold md:text-xl">
            {getFormattedPrice(
              getPriceWithDiscount(product.price, product.discountPercentage),
            )}
          </span>
          {discountBadge !== null && (
            <span
              className={cn(
                "text-xs text-muted-foreground line-through md:text-sm",
                compactOnMobile && "hidden md:inline",
              )}
            >
              {getFormattedPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
