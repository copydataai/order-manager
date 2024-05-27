import { OrderCard } from "~/components/OrderCard";

export function OrderList(props: { orders: any[] }) {
  if (props.orders.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-bold ">No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full auto-cols-auto grid-flow-col gap-4 ">
      {props.orders.map((order) => {
        return <OrderCard key={order.orderId} order={order} />;
      })}
    </div>
  );
}
