import { ProductType } from "@/models/product";
import Link from "next/link";

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href="/"
      className="max-w-70.75 bg-white my-4 rounded-xl border border-[#E4E4E7]"
    >
      <div className="relative">
        <span className="text-xs font-bold bg-lime py-0.75 px-2.5 rounded-full absolute top-3 left-3">
          -{Math.ceil(product.discountPercentage)}%
        </span>
        <img src={product.thumbnail} alt="Product image" />
      </div>

      <div className="flex flex-col px-4.5 pt-3.5 pb-4 border-t">
        <small className="text-xs text-[#5B5B66]">{product?.brand}</small>
        <p className="text-[15px] font-semibold">{product.title}</p>
        <p className="text-xs">★ {product.rating}</p>
        <div className="flex gap-1 items-center mt-2">
          <p className="text-xl font-title font-semibold">
            US$ {product.price}
          </p>
          <span className="text-xs line-through font-medium text-[#5B5B66]">
            US$ 899,99
          </span>
        </div>
      </div>
    </Link>
  );
}
