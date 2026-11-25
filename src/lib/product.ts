import { ProductType } from "@/models/product";

export function getFeaturedProduct(products: ProductType[]) {
  if (!products.length) return null;

  const sortedProducts = [...products].sort(
    (a, b) => b.rating - a.rating || a.id - b.id,
  );

  return sortedProducts[0];
}
