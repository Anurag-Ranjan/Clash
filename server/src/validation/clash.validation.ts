import { z } from "zod";

export const clashSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(3, { message: "Title must be atleast three characters long" })
    .max(60, "Title should not be more than 60 characters long"),
  description: z
    .string({ message: "Description is required" })
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(1000, {
      message: "Description must be at most 1000 characters long",
    }),
  expire_at: z
    .string({ message: "Expire date is required" })
    .min(5, { message: "Please pass a valid date" }),
  image: z.string(),
});
