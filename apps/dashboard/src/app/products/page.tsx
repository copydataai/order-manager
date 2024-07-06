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
    <section className="container flex flex-col items-center justify-center px-4 py-8">
      <div className="grid w-full grid-cols-2 items-center justify-center gap-4 px-4 py-16 md:w-1/2 md:grid-cols-4">
        {data.map((product) => (
          <ProductCard key={product.produtId} product={product} />
        ))}
      </div>
    </section>
  );
}
