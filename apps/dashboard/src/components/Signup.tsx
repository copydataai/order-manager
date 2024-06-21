"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@order/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@order/ui/form";
import { Input } from "@order/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { redirectAuth } from "~/actions/redirect";
import { api } from "~/trpc/react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Please enter a password" }),

  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
});

export function Signup() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const message = api.auth.signup.useMutation({
    onSuccess: async (data) => {
      console.log("It's okay");
      console.log(data);
      await redirectAuth();
    },
    onError: (error) => {
      console.error("It's heaven");
      console.error(error);
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await message.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">First name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Last name</FormLabel>
              <FormControl>
                <Input placeholder="Cage" {...field} />
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
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input placeholder="pasta@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Signup</Button>
      </form>
    </Form>
  );
}
