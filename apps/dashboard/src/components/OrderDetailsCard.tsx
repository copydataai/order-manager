"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@order/ui/card";

import { api } from "~/trpc/react";

export function OrderDetailsCard(props: {
  // TODO: add RouterOutputs
  orderDetail: any;
}) {
  const { orderDetail } = props;
  console.log("orderDetail", orderDetail);

  // TODO: make a suspense or make the action just if its open the Dialog
  const { data, isLoading, isError, error } =
    api.product.getProductById.useQuery({
      productId: orderDetail.productId,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{data?.name}</CardTitle>
        {/* TODO: add notes in CardDescription */}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-slate-500">
          {orderDetail.quantity} x {data?.price} ={" "}
          {orderDetail.quantity * data?.price}
        </p>
        <p>Line item total: {orderDetail.lineTotal}</p>
      </CardContent>
    </Card>
  );
}
