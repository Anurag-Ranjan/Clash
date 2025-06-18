import { Router, Request, Response } from "express";
import { clashSchema, imageValidator } from "../validation/clash.validation.js";
import { UploadedFile } from "express-fileupload";
import { removeImage, uploadFile } from "../helpers/clash.helper.js";
import prisma from "../config/database.js";
import { ZodError } from "zod";
import { formatError } from "../helpers/auth.helper.js";

const clashRouter = Router();

clashRouter.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const clashes = await prisma.clash.findMany({
      where: {
        user_id: req.user?.id,
      },
    });

    return res
      .status(200)
      .json({ message: "Clashes fetched successfully", data: clashes });
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

clashRouter.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!clash || clash == null) {
      return res
        .status(404)
        .json({ message: "No clash with the given id exists" });
    }

    return res
      .status(200)
      .json({ message: "Clash fetched successfully", data: clash });
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

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

clashRouter.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = clashSchema.parse(body);
    const { id } = req.params;

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

      const clash = await prisma.clash.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!clash) {
        return res.status(422).json({ message: "Invalid id" });
      }

      await removeImage(clash?.image!);

      payload.image = await uploadFile(image);
    }

    await prisma.clash.update({
      where: {
        id: Number(id),
      },
      data: { ...payload, expire_at: new Date(payload.expire_at) },
    });

    return res.status(200).json({ message: "Clash updated successfully" });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      return res.status(422).json({ message: "Invalid data", errors });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
});

clashRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const clash = await prisma.clash.findFirst({ where: { id: Number(id) } });

      await removeImage(clash?.image!);

      await prisma.clash.delete({
        where: {
          id: clash?.id,
        },
      });

      return res.status(200).json({ message: "Clash removed successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default clashRouter;
