import express from "express";
import { addDeviceController, deleteDeviceController, getAllDevicesController, getAllDevicesModelUnitsController, updateDeviceController } from "../controllers/device.controller.ts";

const router = express.Router();

router.post("/add", addDeviceController)
router.get("/get-all-devices", getAllDevicesController)
router.get("/get-all-devices/model-units", getAllDevicesModelUnitsController)
router.patch("/update/:id", updateDeviceController)
router.patch("/sold-device", updateDeviceController)
router.delete("/delete-device/:id", deleteDeviceController)

export default router;
