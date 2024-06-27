"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@order/ui/card";

export function OrderDetailsCard(props: {
  // TODO: add RouterOutputs
  orderDetail: any;
}) {
  const { orderDetail, product } = props;

  // TODO: make a suspense or make the action just if its open the Dialog

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{product.name}</CardTitle>
        {/* TODO: add notes in CardDescription */}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-slate-500">
          {orderDetail.quantity} x {product?.price} ={" "}
          {orderDetail.quantity * product?.price}
        </p>
        <p>Line item total: {orderDetail.lineTotal}</p>
      </CardContent>
    </Card>
  );
}
