import Link from "next/link";
import { Button } from "@order/ui/button";

import { DialogProduct } from "~/components/DialogProduct";
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
          <Button asChild>
            <Link href={ordersPath}>Create Order</Link>
          </Button>
          <DialogProduct organizationId={id} />
        </div>
        <ProductList products={products} />
        <TeamMembersCard organizationId={organizationId} />
      </section>
    </>
  );
}
