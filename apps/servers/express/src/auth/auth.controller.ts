import type { Request, Response } from "express";
import { USER } from "./auth.data.js";
import { signAccessToken } from "./jwt.js";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (
    username !== USER.username ||
    password !== USER.password
  ) {
    return res.status(401).json({
      message: "Invalid username/password",
    });
  }

  const token = signAccessToken({
  id: USER.id,
  username: USER.username,
});

  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });

  res.json({
    message: "Login success",
    user: {
      id: USER.id,
      name: USER.name,
    },
  });
};

export const profile = (req: Request, res: Response) => {
  res.json(req.user);
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("accessToken");

  res.json({
    message: "Logout success",
  });
};