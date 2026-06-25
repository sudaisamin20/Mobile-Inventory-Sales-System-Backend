// routes/pdf.routes.ts
import { Router } from "express";
import { downloadPdfController } from "../controllers/pdf.controller.ts";

const router = Router();

// GET /api/pdf/download/:fileName
router.get("/download/:fileName", downloadPdfController);

export default router;