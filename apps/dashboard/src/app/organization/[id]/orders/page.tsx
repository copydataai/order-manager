"use client";

import { Button } from "@order/ui/button";
import { DataTable } from "@order/ui/data-table";
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

import { DialogOrder } from "~/components/DialogOrders";
import { api } from "~/trpc/react";

type Order = {
  orderId: number;
  orderDate: Date;
  customerName: string;
  status: string;
  totalAmount: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const organization = row.original.organization;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* TODO: add dialog or modal to edit specific order */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(organization.name)}
            >
              edit
            </DropdownMenuItem>
            <DropdownMenuItem>show details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export default function OrdersPage({ params }: { params: { id: string } }) {
  const { id } = params;
  // parsing from string to number, because nextjs just can read params as a string
  const organizationId = Number(id);

  const { data, isLoading } = api.order.listAllByOrganizationId.useQuery({
    organizationId,
  });

  if (isLoading)
    return (
      <section className="flex flex-col items-center justify-center gap-4 px-4 py-16">
        <div>Loading...</div>
      </section>
    );

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-4 py-16">
      <DialogOrder organizationId={id} />
      <DataTable data={data} columns={columns} />
    </section>
  );
}
