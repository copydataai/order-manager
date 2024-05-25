import { DialogProduct } from "~/components/DialogProduct";
import { ProductList } from "~/components/ProductList";
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

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <DialogProduct organizationId={id} />
        <ProductList products={products} />
      </section>
    </>
  );
}
