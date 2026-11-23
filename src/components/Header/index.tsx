"use client";

import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mockCategories } from "@/mocks/categories";

import Logo from "../Logo";

const CART_COUNT = 4;

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/products" },
  { label: "Ofertas", href: "/products" },
];

function CartLink({ active }: { active: boolean }) {
  return (
    <Link
      prefetch={false}
      href="/cart"
      aria-current={active ? "page" : undefined}
      aria-label={`Carrinho, ${CART_COUNT} itens`}
      className={cn(
        "relative flex size-11 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-accent",
        active && "bg-accent",
      )}
    >
      <ShoppingBagIcon className="size-6" aria-hidden />
      <span className="absolute top-0.5 right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {CART_COUNT}
      </span>
    </Link>
  );
}

function SearchField({ id, className }: { id: string; className?: string }) {
  return (
    <div role="search" className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        Buscar produtos
      </label>
      <SearchIcon className="absolute top-3 left-3 size-5 text-zinc-500" aria-hidden />
      <input
        id={id}
        type="search"
        placeholder="Buscar produtos"
        className="h-11 w-full rounded-md border bg-card pr-3 pl-10 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
      />
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Abrir menu"
        className="flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-accent"
      >
        <MenuIcon className="size-6" aria-hidden />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex items-center justify-between border-b py-2 pr-2 pl-4">
          <SheetTitle className="flex">
            <Logo />
            <span className="sr-only">Menu</span>
          </SheetTitle>
          <SheetClose
            aria-label="Fechar menu"
            className="flex size-11 items-center justify-center rounded-md hover:bg-accent"
          >
            <XIcon className="size-6" aria-hidden />
          </SheetClose>
        </div>

        <nav aria-label="Menu" className="flex min-h-0 grow flex-col overflow-y-auto">
          <div className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <SheetClose
                key={link.label}
                nativeButton={false}
                render={<Link prefetch={false} href={link.href} />}
                className={cn(
                  "flex h-12 items-center rounded-md px-3 text-base font-medium",
                  link.href === pathname && link.label !== "Ofertas" && "bg-muted font-semibold",
                )}
              >
                {link.label}
              </SheetClose>
            ))}
            <SheetClose
              nativeButton={false}
              render={<Link prefetch={false} href="/cart" />}
              className="flex h-12 items-center justify-between rounded-md px-3 text-base font-medium"
            >
              Carrinho
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                {CART_COUNT}
              </span>
            </SheetClose>
          </div>

          <div className="mx-4 border-t" />

          <div className="flex flex-col gap-1 px-2 py-4">
            <span className="px-3 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Categorias
            </span>
            {mockCategories.map((category) => (
              <SheetClose
                key={category.slug}
                nativeButton={false}
                render={<Link prefetch={false} href="/products" />}
                className="flex h-11 shrink-0 items-center justify-between rounded-md px-3 text-sm text-zinc-700"
              >
                {category.label}
                <ChevronRightIcon className="size-4 text-zinc-500" aria-hidden />
              </SheetClose>
            ))}
          </div>
        </nav>

        <span className="border-t p-4 text-xs text-muted-foreground">
          Loja fictícia · produtos via DummyJSON
        </span>
      </SheetContent>
    </Sheet>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isCart = pathname === "/cart";
  const isProduct = /^\/products\/[^/]+$/.test(pathname);

  return (
    <header className="border-b bg-card">
      <div className="mx-auto hidden max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 md:flex">
        <Link prefetch={false} href="/" aria-label="MKV Store, início">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="flex gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const active =
              link.label === "Início"
                ? pathname === "/"
                : link.label === "Produtos" && pathname.startsWith("/products");
            return (
              <Link
                key={link.label}
                prefetch={false}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent py-3 text-zinc-700 transition-colors hover:text-foreground",
                  active && "border-primary text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex min-w-64 flex-1 items-center justify-end gap-2">
          <SearchField id="header-search" className="max-w-xs flex-1" />
          <CartLink active={isCart} />
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center gap-1 p-2">
          {isProduct || isCart ? (
            <Link
              prefetch={false}
              href="/products"
              aria-label={isCart ? "Continuar comprando" : "Voltar para produtos"}
              className="flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-accent"
            >
              <ChevronLeftIcon className="size-6" aria-hidden />
            </Link>
          ) : (
            <MobileMenu pathname={pathname} />
          )}

          {isCart ? (
            <p className="grow text-center font-display text-xl font-bold">
              Carrinho{" "}
              <span className="font-sans text-sm font-normal text-muted-foreground">({CART_COUNT})</span>
            </p>
          ) : (
            <Link prefetch={false} href="/" aria-label="MKV Store, início" className="flex grow justify-center">
              <Logo />
            </Link>
          )}

          {isCart ? <span className="size-11 shrink-0" /> : <CartLink active={false} />}
        </div>

        {!isProduct && !isCart && (
          <div className="border-t px-4 py-3">
            <SearchField id="mobile-search" />
          </div>
        )}
      </div>
    </header>
  );
}
