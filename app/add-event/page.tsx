"use client";
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
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(50),
  team_size: z.object({
    max: z.number(),
    min: z.number(),
  }),
  student_co: z.object({
    name: z.string().min(2).max(50),
    contact: z.string().min(2).max(50),
  }),
  faculty_co: z.object({
    name: z.string().min(2).max(50),
    contact: z.string().min(2).max(50),
  }),
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
        min: 0,
        max: 0,
      },
      desc: "",
      student_co: {
        contact: "",
        name: "",
      },
      entry_fee: "",
      faculty_co: {
        contact: "",
        name: "",
      },
      venue: "",
      time: "",
      type: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [banner, setBanner] = useState();

  return (
    <div className="container-fix">
      <h1 className="underline underline-offset-8 decoration-ui-primary font-semibold text-2xl text-center">
        Add Event
      </h1>

      <div>
        {banner && (
          <Image alt="banner" src={banner} width={1920} height={1080} />
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
              name="student_co.name"
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
              name="faculty_co.name"
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
              name="student_co.name"
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
                        <SelectItem value="light">Technical</SelectItem>
                        <SelectItem value="dark">Non-Technical</SelectItem>
                        <SelectItem value="system">Hackathon</SelectItem>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <FormField
              control={form.control}
              name="venue"
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
