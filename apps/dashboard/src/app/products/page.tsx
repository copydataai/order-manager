"use client";

import { ProductCard } from "~/components/ProductCard";
import { api } from "~/trpc/react";

export default function ProductsPage() {
  const { data, isLoading, isError, error } =
    api.product.listAllByUserId.useQuery();

  if (isLoading)
    return (
      <section className="container mx-auto px-4 py-8">Loading...</section>
    );

  if (isError)
    return (
      <section className="container mx-auto px-4 py-8">{error.message}</section>
    );

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="auto-cols-2 grid h-1/2 w-full grid-flow-col gap-4">
        {data.map((product) => (
          <ProductCard key={product.produtId} product={product} />
        ))}
      </div>
    </section>
  );
}
