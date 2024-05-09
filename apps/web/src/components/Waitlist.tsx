"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@order/db";
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
import { useToast } from "@order/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addEmailToWaitlist } from "~/utils/subscription";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function WaitlistForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email } = values;
    addEmailToWaitlist(email)
      .then(() => {
        toast({
          description: "Thanks for joining the waitlist!",
        });
      })
      .catch(() => {
        toast({
          description: "You were subscribed to the waitlist already",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="pasta@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Join!</Button>
      </form>
    </Form>
  );
}
