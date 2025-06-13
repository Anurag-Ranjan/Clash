import { Router, Request, Response } from "express";
import { authLimiter } from "../config/limiter.js";

const passwordRouter = Router();

passwordRouter.post(
  "/forgotpassword",
  authLimiter,
  (req: Request, res: Response) => {}
);

export default passwordRouter;
