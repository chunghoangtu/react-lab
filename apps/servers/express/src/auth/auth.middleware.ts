import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "./auth.data.js";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  try {
    req.user = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
