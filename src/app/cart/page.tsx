import { Trash2Icon } from "lucide-react";
import Link from "next/link";

import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/mocks";

const CART_LINES = [
  { product: mockProducts[0], quantity: 1, unitPrice: "US$ 143,81", total: "US$ 143,81" },
  { product: mockProducts[6], quantity: 1, unitPrice: "US$ 124,96", total: "US$ 124,96" },
  { product: mockProducts[7], quantity: 2, unitPrice: "US$ 28,51", total: "US$ 57,02" },
];

function CartLine({ line }: { line: (typeof CART_LINES)[number] }) {
  const { product, quantity, unitPrice, total } = line;
  const href = "/products/88";

  return (
    <li className="flex gap-3 rounded-xl border bg-card p-3 md:flex-wrap md:items-center md:gap-x-5 md:gap-y-4 md:rounded-none md:border-0 md:border-b md:bg-transparent md:p-5">
      <Link prefetch={false} href={href} className="w-24 shrink-0 self-start overflow-hidden rounded-lg bg-image">
        <img src={product.thumbnail} alt={product.title} className="block w-full" />
      </Link>

      <div className="flex min-w-0 grow flex-col gap-1 md:flex-1 md:basis-48">
        <div className="flex items-start gap-1">
          <div className="flex min-w-0 grow flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{product.brand}</span>
            <Link prefetch={false} href={href} className="text-sm leading-snug font-semibold md:text-base">
              {product.title}
            </Link>
            <span className="hidden text-sm text-muted-foreground md:inline">{unitPrice} cada</span>
          </div>
          <Button variant="ghost" size="icon" aria-label={`Remover ${product.title}`} className="-mt-2 -mr-2 md:hidden">
            <Trash2Icon className="size-5" />
          </Button>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 md:hidden">
          <QuantitySelector compact value={quantity} label={`Quantidade de ${product.title}`} />
          <span className="font-display text-lg font-bold">{total}</span>
        </div>
      </div>

      <div className="ml-auto hidden items-center gap-4 md:flex">
        <QuantitySelector value={quantity} label={`Quantidade de ${product.title}`} />
        <span className="min-w-28 text-right font-display text-xl font-bold">{total}</span>
        <Button variant="ghost" size="icon" aria-label={`Remover ${product.title}`}>
          <Trash2Icon className="size-5 text-zinc-700" />
        </Button>
      </div>
    </li>
  );
}

export default function Cart() {
  return (
    <div className="flex flex-1 flex-col gap-6 pt-4 md:py-6">
      <div className="hidden flex-wrap items-baseline gap-3 md:flex">
        <h1 className="font-display text-4xl font-bold tracking-tight">Carrinho</h1>
        <span className="text-base text-muted-foreground">4 itens</span>
      </div>
      <h1 className="sr-only md:hidden">Carrinho</h1>

      <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-3">
        <ul className="flex min-w-0 flex-col gap-3 md:gap-0 md:rounded-2xl md:border md:bg-card lg:col-span-2">
          {CART_LINES.map((line) => (
            <CartLine key={line.product.id} line={line} />
          ))}
          <li className="hidden px-5 py-4 md:block">
            <Link prefetch={false} href="/products" className="text-sm font-medium underline underline-offset-4">
              ← Continuar comprando
            </Link>
          </li>
        </ul>

        <aside
          aria-label="Resumo do pedido"
          className="flex min-w-0 flex-col gap-4 rounded-2xl border bg-card p-4 md:p-6 lg:sticky lg:top-6"
        >
          <h2 className="hidden font-display text-xl font-bold md:block">Resumo do pedido</h2>
          <div className="flex justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Subtotal</span>
            <span>US$ 339,96</span>
          </div>
          <div className="flex justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Descontos</span>
            <span className="font-medium text-success">− US$ 14,17</span>
          </div>
          <div className="flex justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Frete</span>
            <span>Calculado no checkout</span>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <label htmlFor="coupon" className="text-sm font-medium">
              Cupom
            </label>
            <div className="flex gap-2">
              <input
                id="coupon"
                placeholder="Código do cupom"
                className="h-11 min-w-0 grow rounded-md border bg-card px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
              />
              <Button variant="outline" type="button">
                Aplicar
              </Button>
            </div>
          </div>
          <div className="hidden items-baseline justify-between border-t pt-4 md:flex">
            <span className="text-base font-semibold">Total</span>
            <span className="font-display text-3xl font-bold tracking-tight">US$ 325,79</span>
          </div>
          <Button variant="brand" size="xl" type="button" className="hidden md:inline-flex">
            Finalizar compra
          </Button>
          <span className="hidden text-center text-xs text-muted-foreground md:block">
            Valores em dólar, como vêm da API.
          </span>
        </aside>

        <Link
          prefetch={false}
          href="/products"
          className="self-center justify-self-center p-3 text-sm font-medium underline underline-offset-4 md:hidden"
        >
          Continuar comprando
        </Link>

        <div className="sticky bottom-0 -mx-4 flex flex-col gap-2 border-t bg-card px-4 pt-3 pb-6 md:hidden">
          <div className="flex items-baseline justify-between">
            <span className="text-base font-semibold">Total</span>
            <span className="font-display text-2xl font-bold">US$ 325,79</span>
          </div>
          <Button variant="brand" size="xl" type="button" className="w-full">
            Finalizar compra
          </Button>
        </div>
      </div>
    </div>
  );
}
