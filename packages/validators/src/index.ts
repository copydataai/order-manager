import { z } from "zod";

// auth
export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type SignIn = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
});
export type SignUp = z.infer<typeof SignUpSchema>;

// product
export const ProductCreateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().or(z.string()).pipe(z.coerce.number()),
  organizationId: z.number().or(z.string()).pipe(z.coerce.number()),
});

export type ProductCreate = z.infer<typeof ProductCreateSchema>;

// organization
export const OrganizationCreateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  contactInfo: z.string().min(1, { message: "Contact Info is required" }),
});

export const OrganizationCreate = z.infer<typeof OrganizationCreateSchema>;
