import type { Request, Response } from "express";
import {
  getSalesDataService,
  soldDeviceService,
  updateRemainingAmountPaidStatusService,
} from "../services/sales.service.ts";

export const soldDeviceController = async (req: Request, res: Response) => {
  try {
    const soldInfo = await soldDeviceService(req.body);
    res.status(200).json({
      success: true,
      message: "Device marked as sold!",
      data: soldInfo,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSalesDataController = async (req: Request, res: Response) => {
  try {
    const salesData = await getSalesDataService();
    res.status(200).json({
      success: true,
      message: "Sales data has been fetched sucessfully",
      data: salesData,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRemainingAmountPaidStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedSale = await updateRemainingAmountPaidStatusService(req.body);
    res.status(200).json({
      succes: true,
      message: "Remaining amount paid successfully.",
      data: updatedSale,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
