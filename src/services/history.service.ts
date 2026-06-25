import { prisma } from "../config/dbConfig.ts";
import type { ICreateHistory } from "../interfaces/history.interface.ts";

export const createHistoryService = async (data: ICreateHistory) => {
  return await prisma.deviceHistory.create({
    data,
  });
};

export const getAllHistoryService = async () => {
  return await prisma.deviceHistory.findMany({
    include: {
      device: true,
      
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
