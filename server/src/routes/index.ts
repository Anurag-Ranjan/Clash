import { Router } from "express";
import authRouter from "./auth.route.js";
import passwordRouter from "./password.route.js";
import clashRouter from "./clash.route.js";
import { protectRoute } from "../Middlewares/auth.middleware.js";

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/password", passwordRouter);
router.use("/api/v1/clash", protectRoute, clashRouter);

export default router;
