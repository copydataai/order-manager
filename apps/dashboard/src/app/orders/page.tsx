import { DataTable } from "@order/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

import { api } from "~/trpc/server";

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

export const columns: ColummDef<ColumnOrganizationOrder> = [
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
];

export default async function OrdersPage() {
  const data = await api.order.listAll();

  return (
    <section className="container">
      <DataTable data={data} columns={columns} />
    </section>
  );
}
