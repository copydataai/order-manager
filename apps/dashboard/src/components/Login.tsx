"use client";

import type { SignIn } from "@order/validators";
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
import { SignInSchema } from "@order/validators";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signInWithPassword } from "~/app/auth/actions";
import { api } from "~/trpc/react";

export function Login() {
  // 1. Define your form.
  const form = useForm({
    schema: SignInSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, isExecuting } = useAction(signInWithPassword, {
    onError: ({ error, input }) => {
      toast.error("Error", {
        description: "Invalid credentials",
      });
    },
  });

  const onSubmit = (values: SignIn) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder="Email address"
                  type="email"
                  {...field}
                />
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
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder="password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isExecuting} type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
