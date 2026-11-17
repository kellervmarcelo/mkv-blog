"use client";

import { useParams } from "next/navigation";

export default function Product() {
  const params = useParams<{ id: string }>();

  return (
    <>
      <p>O parâmetro é: {params.id} </p>
    </>
  );
}
