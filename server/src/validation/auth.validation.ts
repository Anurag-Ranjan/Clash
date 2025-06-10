import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be atleast three characters long" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be atleast six characters long" }),
    confirm_password: z.string({ message: "Please reenter the password" }),
  })
  .refine(
    (data) => {
      return data.password == data.confirm_password;
    },
    { message: "Passwords do not match", path: ["confirm_password"] }
  );
