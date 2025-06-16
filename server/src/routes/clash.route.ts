import { Router, Request, Response } from "express";
import { clashSchema } from "../validation/clash.validation.js";

const clashRouter = Router();

clashRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  const body = req.body;
  const payload = clashSchema.parse(body);
});

export default clashRouter;
