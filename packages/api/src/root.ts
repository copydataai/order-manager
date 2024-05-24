import { authRouter } from "./router/auth";
import { organizationRouter } from "./router/organizations";
import { productRouter } from "./router/products";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    product: productRouter,
    organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
