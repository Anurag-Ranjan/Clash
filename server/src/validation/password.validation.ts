import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Enter a valid email" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Field is required" })
      .min(6, { message: "Password must be at least six characters long" }),
    confirm_password: z
      .string({ message: "Field is required" })
      .min(6, { message: "Must be at least six characters long" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
