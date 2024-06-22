"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@order/ui/card";

import { currencies } from "~/utils/currency";

export function ProductCard(props: {
  // TODO: add RouterOutputs
  product: any;
}) {
  const { product } = props;
  console.log(product);
  return (
    <Card>
      <CardContent>
        <div className="mt-2 flex w-full items-center justify-center rounded-md border">
          <img src="/orders.webp" alt="orders-logo" />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">{product.name}</p>
          <p className="text-sm text-muted-foreground">
            {currencies.USDollar.format(product.price)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
