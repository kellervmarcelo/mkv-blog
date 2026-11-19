import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import Logo from "../Logo";
import Link from "next/link";
import { SearchIcon, ShoppingBagIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky bg-white top-0 z-50 border-b backdrop-blur flex px-6 py-3.5 items-center gap-x-8 ">
      <Logo />
      <div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-x-6 text-sm font-medium">
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/">Início</Link>} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/products">Produtos</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/offers">Ofertas</Link>}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex gap-2 w-full">
        <div className="flex-1"></div>
        <InputGroup className="bg-white flex-1 border border-[##E4E4E7] rounded-sm max-w-85 h-11 py-3">
          <InputGroupInput
            id="inline-start-input"
            placeholder="Buscar produtos"
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        <div className="relative flex items-center justify-center size-11 cursor-pointer">
          <ShoppingBagIcon size={22} />
          <span className="absolute top-0.75 right-px text-[11px] font-bold text-paper bg-ink min-w-4.5 flex justify-center items-center rounded-full">
            4
          </span>
        </div>
      </div>
    </header>
  );
}
