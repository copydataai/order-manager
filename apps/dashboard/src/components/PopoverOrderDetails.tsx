"use client";

import { useState } from "react";
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
import { OrderDetailCreate, OrderDetailCreateSchema } from "@order/validators";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";

export function OrderDetailsPopover({
  orderDetail,
  onSave,
  index,
  organizationId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const counter = index + 1;
  const form = useForm({
    schema: OrderDetailCreateSchema,
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

  const updateProductUnits = (units) => {
    form.setValue("quantity", units);
    const price = data.find(
      (product) => product.productId === form.watch("productId"),
    )?.price;
    const lineTotal = units * price;

    form.setValue("lineTotal", lineTotal);
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
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  {/* TODO: add watcher or observator to change units */}
                  <Select
                    onValueChange={(value) => {
                      const product = data.find(
                        (product) => product.name === value,
                      );
                      field.onChange(product.productId);
                    }}
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
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-10"
                        onClick={() => updateProductUnits(field.value - 1)}
                      >
                        -
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-10"
                        onClick={() => updateProductUnits(field.value + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <p>Quantity: {form.watch("quantity")}</p>
            <p>LineTotal: {form.watch("lineTotal")}</p>

            <Button
              type="button"
              onClick={() => {
                console.log(form.getValues());
                handleSave();
              }}
            >
              Save
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}
