import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/user.controller.ts";

const router = express.Router();

router.post("/auth/register", registerUserController);
router.post("/auth/login", loginUserController);

export default router;
