import { z } from "zod";
import { supportedMimes } from "../config/filesystem.js";

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
  image: z.string().optional(),
});

export const imageValidator = (size: number, mime: string): string | null => {
  if (bytesToMb(size) > 2) {
    return "File size must be less than 2 MB";
  } else if (!supportedMimes.includes(mime)) {
    return "File type is not supported";
  }
  return null;
};

const bytesToMb = (size: number): number => {
  return size / (1024 * 1024);
};
