"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  return (
    <header className="w-full border-b-3 border-black bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/catmoggy-logo.svg"
              alt="logo"
              width={180}
              height={100}
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          size="icon"
          className="ml-auto mr-4 block border-2 border-black md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Center navigation - hidden on mobile, visible on desktop */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              {[
                { title: "Home", href: "/" },
                { title: "Donation", href: "/donation" },
                { title: "About", href: "/about" },
                { title: "Contact", href: "/contact" },
              ].map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "font-bold text-blue-500"
                        : "text-black hover:font-bold hover:text-blue-500"
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          <Button className="hidden md:flex md:items-center md:gap-2">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
          <Button>Login</Button>
        </div>

        {/* Mobile menu, shown/hidden based on menu state */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-16 z-50 border-b-4 border-black bg-white p-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              {[
                { title: "Home", href: "/" },
                { title: "Donation", href: "/donation" },
                { title: "About", href: "/about" },
                { title: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block rounded-md border-2 border-black bg-white px-4 py-2 font-medium text-black transition-all hover:bg-yellow-300"
                >
                  {item.title}
                </Link>
              ))}
              <Button className="mt-2 w-full border-2 border-black bg-green-400 font-medium text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connect Wallet</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
