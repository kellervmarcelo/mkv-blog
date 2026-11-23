import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Logo from "../Logo";

export default function Footer() {
  return (
    <header className="bg-ink flex px-6 py-3.5 items-center gap-x-8">
      <Logo variant="white" />
      <div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-x-6 text-sm  text-white font-medium">
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link prefetch={false} href="/">Início</Link>} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link prefetch={false} href="/products">Produtos</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link prefetch={false} href="/offers">Ofertas</Link>}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
