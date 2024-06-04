"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@order/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@order/ui/collapsible";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@order/ui/form";
import { Input } from "@order/ui/input";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const orderDetailsSchema = z.object({
  productId: z.number(),
  quantity: z.number().or(z.string()).pipe(z.coerce.number()),
  lineTotal: z.number().or(z.string()).pipe(z.coerce.number()),
});

export function OrderDetailsPopover({ orderDetail, onSave, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const counter = index + 1;
  const form = useForm({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: orderDetail,
  });

  const handleSave = form.handleSubmit((values) => {
    onSave(values);
  });

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Product {counter}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={handleSave} className="space-y-3">
            <FormItem>
              {/* TODO: add a popover to list a product by id and use that to select a product(productID) */}
              <FormLabel>Product ID</FormLabel>
              <FormControl>
                <Input {...form.register("productId")} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input {...form.register("quantity")} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Line Total</FormLabel>
              <FormControl>
                <Input {...form.register("lineTotal")} />
              </FormControl>
            </FormItem>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}
