import { Router, Request, Response } from "express";
import { authLimiter } from "../config/limiter.js";
import { ZodError } from "zod";
import { formatError } from "../helpers/auth.helper.js";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from "../validation/password.validation.js";
import prisma from "../config/database.js";
import { v4 as uuid } from "uuid";
import { formatMailBody } from "../helpers/auth.helper.js";
import bcrypt from "bcrypt";

const passwordRouter = Router();

passwordRouter.post(
  "/forgotpassword",
  authLimiter,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const payload = forgetPasswordSchema.parse(body);

      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user || user === null) {
        return res
          .status(422)
          .json({ errors: { email: "Email not registered" } });
      }

      const password_reset_token = uuid();

      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password_reset_token: password_reset_token,
        },
      });

      await formatMailBody(
        "resetPassword",
        {
          name: user.name,
          email: user.email,
          verifyUrl: `${process.env.FRONTEND_BASE_URL}/resetpassword?token=${password_reset_token}`,
        },
        user.email,
        "Reset your password"
      );

      return res
        .status(200)
        .json({ message: "Email has been sent successfully" });
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errors = formatError(error);
        return res.status(422).json({ message: "Invalid data", errors });
      }
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

passwordRouter.post(
  "/resetPassword",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const password_reset_token = req.query.token as string;
      const payload = await resetPasswordSchema.parse(body);

      if (!password_reset_token) {
        return res.status(401).json({ message: "Unauthorised access" });
      }

      const user = await prisma.user.findFirst({
        where: {
          password_reset_token: password_reset_token,
        },
      });

      if (!user || user === null) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const salt = await bcrypt.genSalt(10);

      const hashedPass = await bcrypt.hash(payload.password, salt);

      const updatedUser = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashedPass,
          password_reset_token: null,
        },
      });

      if (!updatedUser || updatedUser == null) {
        return res.status(500).json({ message: "Something went wrong" });
      }

      return res.status(200).json({ message: "Password changed successfuly" });
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errors = formatError(error);
        return res.status(422).json({ message: "Invalid data", errors });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default passwordRouter;
