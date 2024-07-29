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
    <div className="grid w-full grid-cols-2 items-center justify-center gap-4 px-4 py-16 md:grid-cols-4">
      {props.products.map((prod) => {
        return <ProductCard key={prod.productId} product={prod} />;
      })}
    </div>
  );
}
