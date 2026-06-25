// controllers/pdf.controller.ts
import type { Request, Response } from "express";
import { getPdfPathService } from "../services/pdf.service.ts";

export const downloadPdfController = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params;

    const safeFileName = Array.isArray(fileName)
      ? fileName[0]
      : fileName;

    if (!safeFileName) {
      return res.status(400).json({
        success: false,
        message: "File name is required",
      });
    }

    const filePath = await getPdfPathService(safeFileName);

    return res.download(filePath, `${safeFileName}.pdf`, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading file");
      }
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "PDF not found",
    });
  }
};