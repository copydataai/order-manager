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

type ColumnOrganizationOrder = {
  order: Order;
  organization: Organization;
};

export const columns: ColumnDef<ColumnOrganizationOrder>[] = [
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function OrdersPage() {
  const { data = [], isLoading } = api.order.listAll.useQuery(); // Default to an empty array

  if (isLoading)
    return (
      <section className="flex items-center justify-center">
        {/* TODO: add loading state */}
        <div>Loading...</div>
      </section>
    );

  return (
    <section className="container">
      <DataTable data={data} columns={columns} />
    </section>
  );
}
