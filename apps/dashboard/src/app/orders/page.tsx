import { DataTable } from "@order/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

import { api } from "~/trpc/server";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Order = {
  orderId: number;
  orderDate: Date;
  customerName: string;
  status: string;
  totalAmount: number;
};

export const columns: ColummDef<Order> = [
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
];

export default async function OrdersPage() {
  const data = await api.order.listAll();

  console.log(data);
  return (
    <section className="container">
      <DataTable data={data} columns={columns} />
    </section>
  );
}
