import express from "express";
import {
  getSalesDataController,
  soldDeviceController,
  updateRemainingAmountPaidStatusController,
} from "../controllers/sales.controller.ts";

const router = express.Router();

router.post("/sold/device", soldDeviceController);
router.get("/fetch/sales-data", getSalesDataController);
router.patch("/paid/remaing-amount", updateRemainingAmountPaidStatusController);

export default router;
