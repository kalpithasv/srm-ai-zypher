"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { db } from "@/backend/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  university: z.string().min(2).max(50),
  department: z.string().min(2).max(50),
  regNum: z.string().min(2).max(50),
  contact: z
    .string()
    .min(10, {
      message: "Enter your Mobile Number Properly",
    })
    .max(10, {
      message: "Enter your Mobile Number Properly",
    }),
});

interface RegistrationFormProps {
  name: string;
  email: string;
}

const RegistrationForm = ({ name, email }: RegistrationFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      university: "",
      department: "",
      regNum: "",
      contact: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const docRef = doc(db, "users", email);
    setDoc(
      docRef,
      { ...values, registered: true },
      {
        merge: true,
      }
    )
      .then(() => {
        toast("User Registered Sucessfully");
        router.replace("/dashboard");
      })
      .catch((err) => {
        toast("Error registering User");
        console.log(err);
      });

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 container-fix grid grid-cols-1 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name <span className="text-red-500">*</span>
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
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                University <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="SRM Institute of Science and Technology"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regNum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                University Registration Number{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="RA2111...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Department <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Dept of CSE AIML" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input readOnly placeholder="" {...field} />
              </FormControl>
              <FormDescription>You cannot edit this field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Contact Number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="9537204526" {...field} />
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
  );
};

export default RegistrationForm;
