"use client";

import Product from "@/components/Product";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  return <Product key={id} id={id} />;
}
