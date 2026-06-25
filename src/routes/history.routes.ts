import express from "express";

import { getAllHistoryController } from "../controllers/history.controller.ts";

const router = express.Router();

router.get("/get-all/device-history", getAllHistoryController);

export default router;
