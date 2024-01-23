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
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  type navContent = {
    name: string;
    href: string;
  };
  const navContents: navContent[] = [
    {
      name: "Add Event",
      href: "/add-event",
    },
    {
      name: "Payment Verifications",
      href: "/verifications",
    },
    {
      name: "Registrations",
      href: "/registrations",
    },
  ];

  const path = usePathname();

  const { data: session } = useSession();

  return (
    <div
      className={cn("border-b  border-white/20 sticky top-0 z-50 bg-black/95")}
    >
      <div className="flex justify-between p-4 lg:px-16 xl:max-w-7xl xl:mx-auto items-center">
        <Link href={"/"}>
          <h1 className="text-ui-purple-50 text-base font-bold tracking-wider">
            AI Zypher
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
          <Button
            variant={session?.user ? "destructive" : "default"}
            onClick={() => (session?.user ? signOut() : signIn("google"))}
            className="font-bold"
          >
            {session?.user ? session?.user.name : "Login"}
          </Button>
        </div>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Contents</SheetTitle>
              <div>
                {navContents.map((item, index) => {
                  return (
                    <SheetClose asChild key={index}>
                      <Link
                        className={cn(
                          "text-base flex items-start text-left justify-between font-medium p-2 tracking-wider",
                          path === item.href && " text-ui-purple-50 font-bold"
                        )}
                        href={item.href}
                      >
                        <div>{item.name}</div>
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetFooter className="mt-5">
                  <Button
                    variant={session?.user ? "destructive" : "default"}
                    onClick={() =>
                      session?.user ? signOut() : signIn("google")
                    }
                    className="font-bold"
                  >
                    {session?.user ? session?.user.name : "Login"}
                  </Button>
                </SheetFooter>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
