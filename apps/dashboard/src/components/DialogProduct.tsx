"use client";

import { Button } from "@order/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@order/ui/dialog";
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
import { ProductCreate, ProductCreateSchema } from "@order/validators";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { api } from "~/trpc/react";

export function DialogProduct(props: { organizationId: number }) {
  const organizationId = parseInt(props.organizationId);

  const form = useForm({
    schema: ProductCreateSchema,
    defaultValues: {
      name: "",
      description: "",
      price: 0.0,
      organizationId: organizationId,
    },
  });

  const mutation = api.product.create.useMutation({
    onSuccess: (data) => {
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create product");
    },
  });

  function onSubmit(values: ProductCreate) {
    mutation.mutate(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Open an organization to start selling.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Kimchi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Spicy level 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
