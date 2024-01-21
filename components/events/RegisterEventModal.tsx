"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ArrowBigUp, Copy } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Image from "next/image";

export default function RegisterEventModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1">
            <p>Register</p>
            <ArrowBigUp />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bank Details</DialogTitle>
            <div className="border p-4 rounded-lg">
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold text-ui-primary">Account Number</p>
                <Copy
                  onClick={() => {
                    navigator.clipboard.writeText("635482946194");
                  }}
                  className="w-5 h-5 cursor-pointer hover:scale-105 active:scale-75 ease-in-out duration-300 transition-all"
                />
                <p>635482946194</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold text-ui-primary">IFSC Code</p>
                <Copy
                  onClick={() => {
                    navigator.clipboard.writeText("BOBxxxx");
                  }}
                  className="w-5 h-5 cursor-pointer hover:scale-105 active:scale-75 ease-in-out duration-300 transition-all"
                />
                <p>BOBxxxx</p>
              </div>
            </div>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex items-center gap-1">
          <p>Register</p>
          <ArrowBigUp />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Bank Details</DrawerTitle>
          <div className="border p-4 rounded-lg my-4">
            <div className="grid grid-cols-2">
              <p className="font-semibold text-ui-primary text-sm">
                Account Number
              </p>
              <Copy
                onClick={() => {
                  navigator.clipboard.writeText("635482946194");
                }}
                className="w-5 h-5 cursor-pointer hover:scale-105 active:scale-75 ease-in-out duration-300 transition-all"
              />
              <p>635482946194</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="font-semibold text-ui-primary">IFSC Code</p>
              <Copy
                onClick={() => {
                  navigator.clipboard.writeText("BOBxxxx");
                }}
                className="w-5 h-5 cursor-pointer hover:scale-105 active:scale-75 ease-in-out duration-300 transition-all"
              />
              <p>BOBxxxx</p>
            </div>
          </div>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="bg-white/30 text-white" variant="ghost">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const formSchema = z.object({
  txtId: z.string().min(2).max(50),
  image: z.string().min(2).max(50),
});

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [screenshot, setScreenshot] = useState<Blob | MediaSource>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      txtId: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 grid grid-cols-1 md:flex md:flex-col px-4 md:px-0"
      >
        <FormField
          control={form.control}
          name="txtId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Transaction ID <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Payment Screenshot <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  // @ts-ignore
                  onChangeCapture={(e) => setScreenshot(e.target?.files[0])}
                  type="file"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {screenshot && (
          <Image
            src={URL.createObjectURL(screenshot)}
            width={1920}
            height={1080}
            alt="screenshot"
          />
        )}

        <Button className="md:col-span-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
