import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config/database.js";

interface JwtPayloadWithEmail extends JwtPayload {
  email: string;
  name: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined) {
      res.status(401).json({ errors: { message: "Unauthorized access" } });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayloadWithEmail;

    const email = decoded.email;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        email_verified_at: true,
      },
    });

    if (!user) {
      res.status(422).json({
        errors: {
          message: "Invalid access",
        },
      });
      return;
    }

    req.user = user as AuthUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};
