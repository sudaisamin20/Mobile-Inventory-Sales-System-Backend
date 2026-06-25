import type { Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/user.service.ts";

export const registerUserController = async (req: Request, res: Response) => {
  const { user, token } = await registerUserService(req.body);
  res.status(200).json({
    success: true,
    message: "User created successfully!",
    data: { user, token, refreshToken: token },
  });
};

export const loginUserController = async (req: Request, res: Response) => {
  const { user, token } = await loginUserService(req.body);
  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  res.status(200).json({
    success: true,
    message: "Login successful!",
    data: { user, token, refreshToken: token },
  });
};
