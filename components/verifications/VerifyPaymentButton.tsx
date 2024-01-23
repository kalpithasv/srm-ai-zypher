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

import { useState } from "react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { toast } from "sonner";

function VerifyButton({ payment, email }: any) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full rounded-t-none rounded-b-lg">
            Verify this payment
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Screenshot</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ScreenShotImage
            txtId={payment.txtId}
            email={email}
            screenshot={payment.paymentScreenshot}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-t-none rounded-b-lg">
          Verify this payment
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Screenhot</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>

        <ScreenShotImage
          txtId={payment.txtId}
          screenshot={payment.paymentScreenshot}
          className="px-4"
          email={email}
        />

        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default VerifyButton;

interface ScreenShotImageProps extends React.ComponentProps<"div"> {
  screenshot: string;
  email: string;
  txtId: string;
}
function ScreenShotImage({
  className,
  screenshot,
  email,
  txtId,
}: ScreenShotImageProps) {
  function handleRegistration() {
    const docRef = doc(db, "users", email, "payments", txtId);

    setDoc(
      docRef,
      {
        verificationStatus: "completed",
      },
      { merge: true }
    )
      .then(() => {
        toast("Verified Successfully");
      })
      .catch((err) => {
        toast("Could not able to verify");
        console.error(err);
      });
  }

  return (
    <div className={cn("grid items-start gap-4 mx-auto p-4", className)}>
      <ScrollArea className="w-full h-96">
        <Image
          src={screenshot}
          alt="payment-screenshot"
          width={1920}
          height={1080}
        />
      </ScrollArea>
      <Button onClick={handleRegistration}>Approve Registration</Button>
    </div>
  );
}
