import { Router, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import { ZodError } from "zod";
import { formatError } from "../helpers/auth.helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { formatMailBody } from "../helpers/auth.helper.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { protectRoute } from "../Middlewares/auth.middleware.js";
import { authLimiter } from "../config/limiter.js";

const authRouter = Router();

//register route
authRouter.post(
  "/register",
  authLimiter,
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
        const errors = formatError(error);
        return res.status(422).json({ message: "Invalid data", errors });
      }
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

authRouter.post(
  "/verify",
  authLimiter,
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

authRouter.post(
  "/login",
  authLimiter,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const payload = loginSchema.parse(body);
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          email: true,
          id: true,
          name: true,
          email_verified_at: true,
          password: true,
        },
      });

      if (!user || user == null) {
        return res.status(422).json({
          errors: {
            email: "No user found with the email",
          },
        });
      }

      if (user?.email_verified_at == null || !user.email_verified_at) {
        return res.status(422).json({
          errors: {
            email: "Email has not been verified",
          },
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        payload.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(422).json({
          errors: {
            email: "Invalid credentials",
          },
        });
      }
      const token = await jwt.sign(
        { email: user.email, name: user.name },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      const resUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: `Bearer ${token}`,
      };

      return res
        .status(200)
        .json({ message: "Login Successful", data: resUser });
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

authRouter.post(
  "/check/credentials",
  authLimiter,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const payload = loginSchema.parse(body);
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          email: true,
          id: true,
          name: true,
          email_verified_at: true,
          password: true,
        },
      });

      if (!user || user == null) {
        return res.status(422).json({
          errors: {
            email: "No user found with the email",
          },
        });
      }

      if (user?.email_verified_at == null || !user.email_verified_at) {
        return res.status(422).json({
          errors: {
            email: "Email has not been verified",
          },
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        payload.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(422).json({
          errors: {
            email: "Invalid credentials",
          },
        });
      }

      return res.status(200).json({
        message: "Login Successful",
        data: { email: user.email, password: payload.password },
      });
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

authRouter.get(
  "/getuser",
  authLimiter,
  protectRoute,
  (req: Request, res: Response): void => {
    try {
      const user = req.user;
      res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
      return;
    } catch (error) {
      res.status(500).json({ message: "Somehting went wrong" });
      return;
    }
  }
);

export default authRouter;
