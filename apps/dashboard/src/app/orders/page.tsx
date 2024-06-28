"use client";

import { Button } from "@order/ui/button";
import { DataTable } from "@order/ui/data-table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@order/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { OrderDetailsCard } from "~/components/OrderDetailsCard";
import { api } from "~/trpc/react";

type Organization = {
  organizationId: number;
  name: string;
  location: string;
  contactInfo: string;
};

type Order = {
  orderId: number;
  orderDate: Date;
  customerName: string;
  status: string;
  totalAmount: number;
};

type OrderDetail = {
  orderId: number;
  productId: number;
  quantity: number;
  orderDetailId: number;
  lineTotal: number;
};
type Product = {
  name: string;
  description: string;
  organizationId: number;
  productId: number;
  price: number;
};
type OrderDetailsProduct = {
  [orderId: number]: {
    order: Order;
    orderdetails: {
      OrderDetail: OrderDetail;
      Product: Product;
    };
  };
};
export const columns: ColumnDef<OrderDetailsProduct>[] = [
  {
    accessorKey: "order.orderId",
    header: "Order ID",
  },
  {
    accessorKey: "organization.name",
    header: "Organization",
  },
  {
    accessorKey: "order.orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "order.customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "order.status",
    header: "Status",
  },
  {
    accessorKey: "order.totalAmount",
    header: "Total Amount",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const details = order.orderdetails;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <span>show details</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{order.order.customerName}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              {details.map((orderDetail) => (
                <OrderDetailsCard
                  orderDetail={orderDetail.orderdetail}
                  product={orderDetail.product}
                />
              ))}
            </div>
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export default function OrdersPage() {
  const { data = [], isLoading, isError, error } = api.order.listAll.useQuery(); // Default to an empty array

  if (isLoading)
    return (
      <section className="flex items-center justify-center">
        {/* TODO: add loading state */}
        <div>Loading...</div>
      </section>
    );
  console.log(data);

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-4 py-16">
      <DataTable data={Object.values(data)} columns={columns} />
    </section>
  );
}
