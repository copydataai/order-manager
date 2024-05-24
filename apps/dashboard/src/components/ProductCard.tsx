"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@order/ui/card";

export function ProductCard(props: {
  // TODO: add RouterOutputs
  product: any;
}) {
  const { product } = props;
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product.price}</p>
      </CardContent>
    </Card>
  );
}
