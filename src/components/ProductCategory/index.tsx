import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

type ProductCategoryProps = {
  label: string;
};

export default function ProductCategory({ label }: ProductCategoryProps) {
  return (
    <Link
      prefetch={false}
      href="/products"
      className="flex h-11 shrink-0 items-center justify-between gap-2 rounded-full border bg-card px-4 text-sm font-medium whitespace-nowrap transition-colors hover:border-zinc-300 md:h-auto md:min-h-14 md:rounded-xl md:font-semibold md:whitespace-normal"
    >
      {label}
      <ArrowRightIcon className="hidden size-4 shrink-0 md:block" aria-hidden />
    </Link>
  );
}
