"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Wallet, X } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu jika klik di luar
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b-3 border-black transition-all duration-300",
        isScrolled ? "bg-white/50 backdrop-blur-sm shadow-md" : "bg-white"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
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
          ref={buttonRef}
          size="icon"
          className="ml-auto mr-4 border-2 border-black md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Center navigation - desktop only */}
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

        {/* Right buttons */}
        <div className="flex items-center space-x-2">
          <Button className="hidden md:flex md:items-center md:gap-2">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className="absolute left-0 right-0 top-16 z-50 border-b-4 border-black bg-white p-4 md:hidden"
          >
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
                  className={cn(
                    "border-b-2 border-black bg-white px-4 py-2 font-medium text-black transition-all",
                    pathname === item.href
                      ? "font-bold text-blue-500"
                      : "text-black hover:font-bold hover:text-blue-500"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <Button className="mt-2 w-full">
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
