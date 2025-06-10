import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/auth.validation.js";
import { ZodError } from "zod";
import { formatError } from "../helpers/auth.helper.js";

const authRouter = Router();

//register route
authRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const payload = registerSchema.parse(body);
      return res
        .status(200)
        .json({ message: "Checks applied, no errors found", data: payload });
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError = formatError(error);
        return res.status(422).json(formattedError);
      }
    }
  }
);

export default authRouter;
