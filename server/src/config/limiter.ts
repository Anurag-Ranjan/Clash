import { rateLimit } from "express-rate-limit";

export const appLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //60 mins
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  limit: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
