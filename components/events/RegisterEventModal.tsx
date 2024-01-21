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
import { useEffect, useState } from "react";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/backend/firebase";
import { useSession } from "next-auth/react";
import { DocumentData, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RegisterEventModalProps {
  event: EventType;
}

export default function RegisterEventModal({ event }: RegisterEventModalProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            suppressHydrationWarning
            className={cn("flex items-center gap-1")}
          >
            Register
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
          <ProfileForm event={event} />
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
        <ProfileForm event={event} className="px-4" />
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

interface ProfileFormProps extends React.ComponentProps<"form"> {
  event: EventType;
}

function ProfileForm({ className, event }: ProfileFormProps) {
  const defineTeammates = Array(event.team_size?.max)
    .fill(0)
    .map((_, index) => {
      return event.team_size.min < index + 1
        ? z.string()
        : z.string().min(2).max(50);
    });
  const defineTeammatesKeys = Array(event.team_size?.max)
    .fill(0)
    .map((_, index) => {
      return `teammate${index + 1}`;
    });

  const result = Object.assign(
    // @ts-ignore
    ...defineTeammatesKeys.map((k, i) => ({ [k]: defineTeammates[i] }))
  );

  const formSchema = z.object({
    txtId: z.string().min(2).max(50),
    image: z.string().min(2).max(50),
    ...result,
  });

  const [screenshot, setScreenshot] = useState<
    Blob | Uint8Array | ArrayBuffer | MediaSource
  >();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      txtId: "",
      image: "",
      ...Object.assign(
        // @ts-ignore
        ...defineTeammatesKeys.map((k, i) => ({ [k]: "" }))
      ),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const screenshotRef = ref(
      storage,
      `payments/${session?.user?.email + "-" + values.txtId}`
    );

    uploadBytes(screenshotRef, screenshot! as Blob | Uint8Array | ArrayBuffer)
      .then((response) => {
        const ref = response.ref;

        getDownloadURL(ref).then((url) => {
          const newPaymentRef = doc(
            db,
            "users",
            session?.user?.email!,
            "payments",
            values.txtId
          );
          setDoc(
            newPaymentRef,
            {
              paymentScreenshot: url,
              eventId: event.id,
              ...values,
              verificationStatus: "pending",
            },
            { merge: true }
          )
            .then(() => {
              toast("Payment screenshot uploaded successfully");
              form.reset();
            })
            .catch((err) => {
              console.log(err);
              toast("Uploading Payment Screenshot failed");
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-0"
      >
        {defineTeammatesKeys.map((teammate: string, index: number) => {
          return (
            <FormField
              key={index}
              control={form.control}
              // @ts-ignore
              name={teammate}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Teammate {index + 1} name{" "}
                    {event.team_size.min > index && (
                      <span className="text-red-500">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
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
            src={URL.createObjectURL(screenshot as Blob | MediaSource)}
            width={1920}
            height={1080}
            alt="screenshot"
            className="md:col-span-2"
          />
        )}

        <Button className="md:col-span-2 mt-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
