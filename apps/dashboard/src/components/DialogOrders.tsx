"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@order/db";
import { cn } from "@order/ui";
import { Button } from "@order/ui/button";
import { Calendar } from "@order/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@order/ui/popover-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@order/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "~/trpc/react";
import { OrderDetailsPopover } from "./PopoverOrderDetails"; // Ensure correct path

const orderDetailsSchema = z.object({
  productId: z.number(),
  quantity: z.number().or(z.string()).pipe(z.coerce.number()),
  lineTotal: z.number().or(z.string()).pipe(z.coerce.number()),
});

const orderSchema = z.object({
  customerName: z.string().min(1, { message: "Customer name is required" }),
  orderDate: z.date().or(z.string()).optional(),
  status: z.enum(["FINISHED", "CANCELLED", "ORDERED"]),
  orderDetails: z.array(orderDetailsSchema),
  totalAmount: z.number().or(z.string()).pipe(z.coerce.number()),
  organizationId: z.number().or(z.string()).pipe(z.coerce.number()).optional(),
});

export function DialogOrder(props: { organizationId: number }) {
  const { organizationId } = props;
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      status: "ORDERED",
      totalAmount: 0.0,
      orderDate: new Date(),
      organizationId: organizationId,
      orderDetails: [], // Initialize orderDetails as an empty array
    },
  });

  const mutation = api.order.createOrderAndOrderDetails.useMutation({
    onSuccess: (data) => {
      toast.success("Order created", {
        description: "Your order has been created successfully.",
      });
    },
    onError: (error) => {
      toast.error("Error creating order", {
        description: error.message,
      });
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutate(values);
  });

  const calculateTotalAmount = (orderDetails: orderDetailsSchema[]) => {
    return orderDetails.reduce((total, detail) => total + detail.lineTotal, 0);
  };

  const handleOrderDetailSave = (index, detail) => {
    const orderDetails = form.getValues("orderDetails");
    orderDetails[index] = detail;
    form.setValue("orderDetails", orderDetails);

    form.setValue("totalAmount", calculateTotalAmount(orderDetails));
  };

  const addNewOrderDetail = () => {
    const orderDetails = form.getValues("orderDetails");
    const newDetail = {
      productId: 0,
      quantity: 0,
      lineTotal: 0,
    };
    form.setValue("orderDetails", [...orderDetails, newDetail]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>Create an order</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for the order" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FINISHED">FINISHED</SelectItem>
                      <SelectItem value="ORDERED">ORDERED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total amount</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Order date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="fixed z-[75] w-auto p-0"
                      sideOffset={10}
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : null}
                        onSelect={(date) => {
                          field.onChange(date);
                        }}
                        disabled={(date) =>
                          date > new Date("2100-01-01") ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The date for the order</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
              {form.watch("orderDetails").map((detail, index) => (
                <OrderDetailsPopover
                  key={index}
                  orderDetail={detail}
                  organizationId={organizationId}
                  index={index}
                  onSave={(updatedDetail) =>
                    handleOrderDetailSave(index, updatedDetail)
                  }
                />
              ))}
              <Button type="button" onClick={addNewOrderDetail}>
                Add Order Detail
              </Button>
            </div>
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
