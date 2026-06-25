import type { Request, Response } from "express";
import {
  addDeviceService,
  deleteDeviceService,
  getAllDevicesByModelUnitsService,
  getAllDevicesService,
  soldDeviceService,
  updateDeviceService,
} from "../services/device.service.ts";
import { prisma } from "../config/dbConfig.ts";

export const addDeviceController = async (req: Request, res: Response) => {
  try {
    console.log("Received device data:", req.body);
    const device = await addDeviceService(req.body);

    res.status(201).json({
      success: true,
      message: "Device created successfully",
      data: device,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDevicesController = async (req: Request, res: Response) => {
  try {
    const devices = await getAllDevicesService();
    res.status(200).json({
      success: true,
      message: "Devices retrieved successfully",
      data: devices,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDevicesModelUnitsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const devices = await getAllDevicesByModelUnitsService();

    const grouped = devices.reduce(
      (acc, device) => {
        const key = `${device.brand}-${device.model}`;

        if (!acc[key]) {
          acc[key] = {
            model: device.model,
            brand: device.brand,
            image: device.frontImage,

            units: 0,

            colors: new Set<string>(),
            variants: new Set<string>(),
          };
        }

        acc[key].units += 1;

        acc[key].colors.add(device.color);
        acc[key].variants.add(device.variant);

        return acc;
      },
      {} as Record<string, any>,
    );

    const result = Object.values(grouped).map((item) => ({
      ...item,
      colors: item.colors.size,
      variants: item.variants.size,
    }));

    res.status(200).json({
      success: true,
      message: "Device model units retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDeviceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const device = await updateDeviceService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Device updated successfully",
      data: device,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const soldDeviceController = async (req: Request, res: Response) => {
  try {
    const { id }: { id: string } = req.body;
    const device = await soldDeviceService(id);
    res.status(200).json({
      success: true,
      message: "Device marked as sold!",
      data: device,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDeviceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const device = await deleteDeviceService(id);
    res.status(200).json({
      success: true,
      message: "Device deleted successfully!",
      data: device,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
