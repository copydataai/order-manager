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
    header: "Order Date",
    accessorFn: ({ order }) => {
      return new Date(order.orderDate).toDateString();
    },
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

export function OrdersTable({ organizationId }) {
  const { data, isLoading, isError, error } =
    api.order.listAllOrdersDetailsProductsbyOrganizationId.useQuery({
      organizationId,
    });

  if (isLoading)
    return (
      <section className="flex flex-col items-center justify-center gap-4 px-4 py-16">
        <div>Loading...</div>
      </section>
    );

  if (isError) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 px-4 py-16">
        <div>Error: {error.message}</div>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 px-4 py-16 md:w-1/2">
      <DataTable data={Object.values(data)} columns={columns} />
    </section>
  );
}
