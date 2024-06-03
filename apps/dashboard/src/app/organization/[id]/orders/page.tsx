import { DialogOrder } from "~/components/DialogOrders";
import { OrderList } from "~/components/OrdersList";
import { api } from "~/trpc/server";

export default async function OrdersPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // parsing from string to number, because nextjs just can read params as a string
  const organizationId = Number(id);

  const orders = await api.order.listAllByOrganizationId({ organizationId });

  return (
    <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
      <DialogOrder organizationId={id} />
      <OrderList orders={orders} />
    </section>
  );
}
