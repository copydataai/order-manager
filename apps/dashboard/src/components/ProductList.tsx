import { ProductCard } from "~/components/ProductCard";

export function ProductList(props: { products: any[] }) {
  if (props.products.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-bold ">No Products yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full auto-cols-auto grid-flow-col gap-4 ">
      {props.products.map((prod) => {
        return <ProductCard key={prod.productId} product={prod} />;
      })}
    </div>
  );
}
