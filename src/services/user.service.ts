import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "../config/dbConfig.ts";
import type { IUserData } from "../interfaces/user.interface.ts";

// Registration service
export const registerUserService = async (data: IUserData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phoneNo: data.phoneNo,
      password: hashedPassword,
    },
  });

  const payload = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    phoneNo: user.phoneNo,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return { user, token };
};

// Login service
export const loginUserService = async (data: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const payload = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    phoneNo: user.phoneNo,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );
  return { user, token };
};
