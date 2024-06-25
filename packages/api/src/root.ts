import { orderRouter } from "./router/orders";
import { organizationRouter } from "./router/organizations";
import { productRouter } from "./router/products";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
    product: productRouter,
    organization: organizationRouter,
    order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
