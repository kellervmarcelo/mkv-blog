"use client";

import ProductDetail from "@/components/ProductDetail";
import { mockProducts } from "@/mocks";

export default function Product() {
  return <ProductDetail product={mockProducts[0]} related={mockProducts.slice(1, 5)} />;
}
