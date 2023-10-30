import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  username: z
    .string()
    .trim()
    .regex(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: z.string().trim().min(8, "Password is required")
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
