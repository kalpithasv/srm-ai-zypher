"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { useState } from "react";

interface EventRegistrationCard {
  payment: { paymentId: string };
}
function EventRegistrationCard({ payment }: EventRegistrationCard) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="active:scale-95 transition-all ease-in-out duration-300 border rounded-lg cursor-pointer">
            {/* <Image
              //   @ts-ignore
              src={banner}
              alt="eventBanner"
              width={1920}
              height={1080}
              className="rounded-t-lg"
            /> */}
            <div className="p-2">
              <p className="text-ui-primary font-semibold">
                Transaction ID:{" "}
                <span className="text-white">{payment?.paymentId}</span>
              </p>
              <p className="text-ui-primary font-semibold">
                Event ID: {/* @ts-ignore */}
                <span className="text-white">{payment?.eventId}</span>
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="active:scale-95 transition-all ease-in-out duration-300 border rounded-lg cursor-pointer">
          {/* <Image
            //   @ts-ignore
            src={events.data().banner}
            alt="eventBanner"
            width={1920}
            height={1080}
            className="rounded-t-lg"
          /> */}
          <div className="p-2">
            <p className="text-ui-primary font-semibold">
              Transaction ID:{" "}
              <span className="text-white">{payment?.paymentId}</span>
            </p>
            <p className="text-ui-primary font-semibold">
              Event ID: {/* @ts-ignore */}
              <span className="text-white">{payment?.eventId}</span>
            </p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default EventRegistrationCard;
