import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@order/ui/tabs";

import { DialogOrder } from "~/components/DialogOrders";
import { DialogProduct } from "~/components/DialogProduct";
import { OrdersTable } from "~/components/OrdersTable";
import { ProductList } from "~/components/ProductList";
import { TeamMembersCard } from "~/components/TeamMembersCard";
import { api } from "~/trpc/server";

export default async function OrganizationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // parsing from string to number, because nextjs just can read params as a string
  const organizationId = Number(id);

  const products = await api.product.listAllByOrganizationID({
    organizationId,
  });

  const ordersPath = `/organization/${id}/orders`;

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex gap-4">
          <DialogOrder organizationId={organizationId} />
          <DialogProduct organizationId={id} />
          <TeamMembersCard organizationId={organizationId} />
        </div>

        <Tabs
          defaultValue="products"
          className="flex w-[400px] flex-col items-center gap-2"
        >
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductList products={products} />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersTable organizationId={organizationId} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
