"use client";
import { db, storage } from "@/backend/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string(),
  team_size: z.object({
    max: z.string().min(1).max(2),
    min: z.string().min(1).max(2),
  }),
  student_co: z.string(),
  faculty_co: z.string(),
  entry_fee: z.string().min(2).max(50),
  banner: z.string().min(2).max(50),
  venue: z.string().min(2).max(50),
  time: z.string().min(2).max(50),
  type: z.string().min(2).max(50),
});

const AddEvent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      banner: "",
      team_size: {
        min: "",
        max: "",
      },
      desc: "",
      student_co: "",
      entry_fee: "",
      faculty_co: "",
      venue: "",
      time: "",
      type: "",
    },
  });

  const [banner, setBanner] = useState();

  const lpad = function (s: string, width: number) {
    return s.length >= width
      ? s
      : (new Array(width).join("0") + s).slice(-width);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const colRef = collection(db, "events");
    const snapshot = await getCountFromServer(colRef);
    const newID = `Az${lpad(String(snapshot.data().count + 1), 3)}`;

    const docRef = doc(db, "events", newID);
    const screenshotRef = ref(storage, `events/${newID}`);

    function convertArrayToObject(inputArray: string[]): ContactInfo[] {
      const resultArray: ContactInfo[] = [];

      for (let i = 0; i < inputArray.length; i += 2) {
        const name = inputArray[i];
        const contact = inputArray[i + 1];

        if (name && contact) {
          resultArray.push({ name, contact });
        }
      }

      return resultArray;
    }

    const facultyCo = convertArrayToObject(values.faculty_co.split(","));
    const studentCo = convertArrayToObject(values.student_co.split(","));

    uploadBytes(screenshotRef, banner! as Blob | Uint8Array | ArrayBuffer).then(
      (response) => {
        const ref = response.ref;

        getDownloadURL(ref).then((url) => {
          setDoc(
            docRef,
            {
              title: values.title,
              desc: values.desc,
              team_size: {
                max: values.team_size.max,
                min: values.team_size.max,
              },
              student_co: studentCo,
              faculty_co: facultyCo,
              entry_fee: values.entry_fee,
              banner: url,
              id: newID,
              venue: values.venue,
              time: values.time,
              type: values.type,
            },
            { merge: true }
          )
            .then(() => {
              toast(`Event ${newID} added successfully`);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  }

  return (
    <div className="container-fix">
      <h1 className="underline underline-offset-8 decoration-ui-primary font-semibold text-2xl text-center">
        Add Event
      </h1>

      <div>
        {banner && (
          <Image
            alt="banner"
            src={URL.createObjectURL(banner as Blob | MediaSource)}
            width={1920}
            height={1080}
            className="w-fit md:h-96 mx-auto py-4"
          />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 container-fix"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Landing Page Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Upload</FormLabel>
                  <FormControl>
                    <Input
                      // @ts-ignore
                      onChangeCapture={(e) => setBanner(e.target?.files[0])}
                      type="file"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="flex flex-col md:col-span-2">
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <textarea
                      className=" bg-transparent border p-2 rounded-lg h-40"
                      placeholder="Event Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="student_co"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Student Coordinators</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border p-2 rounded-lg"
                      placeholder="Faculty1 Name,Contact Number1,Faculty2 Name,Contact Number2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty_co"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Faculty Coordinators</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border p-2 rounded-lg"
                      placeholder="Faculty1 Name,Contact Number1,Faculty2 Name,Contact Number2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Type of Event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="non-technical">
                          Non-Technical
                        </SelectItem>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border p-2 rounded-lg"
                      placeholder="BMS Lab 8"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="team_size.min"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Team Size min</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border p-2 rounded-lg"
                      placeholder="2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team_size.max"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Team Size max</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border p-2 rounded-lg"
                      placeholder="4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entry_fee"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Entry Fee</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border p-2 rounded-lg"
                      placeholder="50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border p-2 rounded-lg"
                      placeholder="10 AM"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="md:col-span-2" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddEvent;
