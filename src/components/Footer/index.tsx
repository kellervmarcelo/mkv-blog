"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import Logo from "../Logo";

const FOOTER_LINKS = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/products" },
  { label: "Carrinho", href: "/cart" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hiddenOnMobile =
    pathname === "/cart" || /^\/products\/[^/]+$/.test(pathname);

  return (
    <footer
      className={cn(
        "mt-10 bg-primary text-zinc-300",
        hiddenOnMobile && "hidden md:block",
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-16 md:gap-y-6 md:px-6 md:py-10">
        <Link
          prefetch={false}
          href="/"
          aria-label="MKV Store, início"
          className={cn(
            "self-start md:self-auto",
            !isHome && "hidden md:inline-flex",
          )}
        >
          <Logo size="sm" className="text-primary-foreground" />
        </Link>
        <nav
          aria-label="Rodapé"
          className={cn(
            "flex flex-col text-sm md:flex-row md:gap-7",
            !isHome && "hidden md:flex",
          )}
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              prefetch={false}
              href={link.href}
              className="py-3 transition-colors hover:text-primary-foreground md:py-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="text-xs text-zinc-400 md:text-sm">
          Loja fictícia · produtos via DummyJSON
        </span>
      </div>
    </footer>
  );
}
