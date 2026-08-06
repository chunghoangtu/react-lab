import { Router } from "express";
import { login, logout, profile } from "./auth.controller.js";
import { authMiddleware } from "./auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authMiddleware, profile);

export default router;