import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/auth.validation.js";
import { ZodError } from "zod";
import { formatError } from "../helpers/auth.helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { formatMailBody } from "../helpers/auth.helper.js";
import { v4 as uuidv4 } from "uuid";

const authRouter = Router();

//register route
authRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const payload = registerSchema.parse(body);
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (user) {
        return res.status(422).json({
          errors: {
            email: "User with the email already exists already exists",
          },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      const createdUser = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: hashedPassword,
        },
      });

      const token = uuidv4();

      console.log(token);

      const emailParams = {
        name: createdUser.name,
        email: createdUser.email,
        verifyUrl: `${process.env
          .FRONTEND_BASE_URL!}/verifyUser?token=${token}`,
      };

      await formatMailBody(
        "verifyMail",
        emailParams,
        createdUser.email,
        "Kindly verify your email"
      );

      await prisma.user.update({
        where: {
          email: createdUser.email,
        },
        data: {
          email_verify_token: token,
        },
      });

      return res
        .status(200)
        .json({ message: "User registered successfully", data: createdUser });
    } catch (error: any) {
      if (error instanceof ZodError) {
        const formattedError = formatError(error);
        return res.status(422).json(formattedError);
      }
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

authRouter.post(
  "/verify",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.query.token!;

      if (typeof token !== "string") {
        console.log("Le bhai dikkat");
        return res.status(400).json({ message: "Invalid token format" });
      }

      const user = await prisma.user.findFirst({
        where: {
          email_verify_token: token,
        },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid verification" });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email_verified_at: new Date().toISOString(),
          email_verify_token: null,
        },
      });
      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error: any) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

export default authRouter;
