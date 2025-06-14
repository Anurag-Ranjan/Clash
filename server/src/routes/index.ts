import { Router } from "express";
import authRouter from "./auth.route.js";
import passwordRouter from "./password.route.js";

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/password", passwordRouter);

export default router;
