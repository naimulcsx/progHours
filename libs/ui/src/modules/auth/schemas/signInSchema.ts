import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: z.string().trim().min(8, "Password is required")
});

export type SignInSchema = z.infer<typeof signInSchema>;
