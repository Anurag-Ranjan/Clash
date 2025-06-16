import { Router, Request, Response } from "express";
import { clashSchema, imageValidator } from "../validation/clash.validation.js";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../helpers/clash.helper.js";
import prisma from "../config/database.js";
import { ZodError } from "zod";
import { formatError } from "../helpers/auth.helper.js";

const clashRouter = Router();

clashRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = clashSchema.parse(body);

    if (req.files?.image) {
      const image = req.files?.image as UploadedFile;
      const validatorMessage = imageValidator(image.size, image.mimetype);
      if (validatorMessage) {
        return res.status(422).json({
          errors: {
            image: validatorMessage,
          },
        });
      }

      payload.image = await uploadFile(image);
    } else {
      return res.status(422).json({
        errors: {
          image: "Image is required",
        },
      });
    }

    await prisma.clash.create({
      data: {
        ...payload,
        image: payload.image,
        user_id: req.user?.id!,
        expire_at: new Date(payload.expire_at),
      },
    });

    return res.status(200).json({ message: "Clash created successfully" });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      return res.status(422).json({ message: "Invalid data", errors });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default clashRouter;
