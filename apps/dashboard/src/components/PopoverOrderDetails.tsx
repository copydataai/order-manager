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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@order/ui/form";
import { Input } from "@order/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@order/ui/select";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CarouselProduct } from "~/components/CarouselProduct";
import { api } from "~/trpc/react";

const orderDetailsSchema = z.object({
  productId: z.number(),
  quantity: z.number().or(z.string()).pipe(z.coerce.number()),
  lineTotal: z.number().or(z.string()).pipe(z.coerce.number()),
});

export function OrderDetailsPopover({
  orderDetail,
  onSave,
  index,
  organizationId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const counter = index + 1;
  const form = useForm({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: orderDetail,
  });

  const { isPending, isError, data, error } =
    api.product.listAllByOrganizationID.useQuery({
      organizationId: parseInt(organizationId),
    });

  const handleSave = form.handleSubmit((values) => {
    onSave(values);
  });

  if (isPending) {
    return <span> ... Is loading products</span>;
  }

  if (isError) {
    return <span> {error.message} </span>;
  }

  const updateProductUnits = (productId, units) => {
    form.setValue("quantity", units);
    form.setValue("productId", productId);
  };

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
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  {/* // TODO: change Carousel by select */}
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.map((product, index) => (
                        <SelectItem key={index} value={product.name}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p>{field.value}</p>
                </FormItem>
              )}
            />

            <p>Quantity: {form.watch("quantity")}</p>
            <p>Line Total: {form.watch("quantity")}</p>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}
