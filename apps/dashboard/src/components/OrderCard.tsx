import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@order/ui/card";

export async function OrderCard(props: {
  // TODO: add RouterOutputs
  order: any;
}) {
  const { order } = props;
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{order.customerName}</CardTitle>
        {/* TODO: change the date to DD/MM/YYYY HH:MM */}
        <CardDescription>{order.orderDate.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{order.status}</p>
        <p>{order.totalAmount}</p>
      </CardContent>
    </Card>
  );
}
