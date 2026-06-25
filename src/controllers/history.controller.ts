import type { Request, Response } from "express";
import { getAllHistoryService } from "../services/history.service.ts";

export const getAllHistoryController = async (req: Request, res: Response) => {
  try {
    const history = await getAllHistoryService();

    return res.status(200).json({
      success: true,
      message: "History fetched successfully",
      data: history,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
