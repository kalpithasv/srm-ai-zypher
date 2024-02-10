"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useEffect, useRef } from "react";
const Header = () => {
  type navContent = {
    name: string;
    href: string;
  };
  const navContents: navContent[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Events",
      href: "/events",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Sponsors",
      href: "/sponsors",
    },
  ];

  const path = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && path == "/") {
        if (window.scrollY) {
          navRef.current.classList.add("opacity-100");
        } else {
          navRef.current.classList.remove("opacity-100");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navRef, path]);

  return (
    <div
      ref={navRef}
      className={cn(
        path == "/" ? "opacity-0" : "opacity-100",
        "border-b  border-white/20 sticky top-0 z-50 bg-black/95"
      )}
    >
      <div className="flex justify-between p-4 lg:px-16 xl:max-w-7xl xl:mx-auto items-center">
        <Link href={"/"}>
          <h1 className="text-ui-purple-50 text-base font-bold tracking-wider">
            {`Zypher'24`}
          </h1>
        </Link>
        <div className="hidden md:inline-flex gap-4 items-center">
          {navContents.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <p
                  className={cn(
                    path === item.href && "font-bold",
                    "text-sm py-2 px-4 font-semibold"
                  )}
                >
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Contents</SheetTitle>
              <SheetDescription className="flex flex-col">
                {navContents.map((item, index) => {
                  return (
                    <SheetClose key={index} asChild>
                      <Link href={item.href}>
                        <div
                          className={cn(
                            "text-base flex items-center justify-between font-medium p-2 tracking-wider",
                            path === item.href && " text-ui-primary font-bold"
                          )}
                        >
                          <p>{item.name}</p>
                        </div>
                      </Link>
                    </SheetClose>
                  );
                })}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
