"use client";

import QRCode from "react-qr-code";
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

import { useState } from "react";
import { useSession } from "next-auth/react";

function VerifyQr({
  eventTitle,
  paymentStatus,
}: {
  eventTitle: string;
  paymentStatus: string;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full rounded-t-none rounded-b-lg">
            Show QR
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Show QR</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <QrCodeCreator
            paymentStatus={paymentStatus}
            eventTitle={eventTitle}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-t-none rounded-b-lg">Show QR</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Show QR</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <QrCodeCreator
          paymentStatus={paymentStatus}
          eventTitle={eventTitle}
          className="px-4"
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default VerifyQr;

interface QrCodeCreatorProps extends React.ComponentProps<"div"> {
  eventTitle: string;
  paymentStatus: string;
}
function QrCodeCreator({
  className,
  eventTitle,
  paymentStatus,
}: QrCodeCreatorProps) {
  const { data: session } = useSession();
  return (
    <div className={cn("grid items-start gap-4 mx-auto p-4", className)}>
      <QRCode
        value={JSON.stringify(
          {
            name: session?.user?.name,
            email: session?.user?.email,
            eventName: eventTitle,
            paymentStatus: paymentStatus,
          },
          null,
          2
        )}
      />
    </div>
  );
}
