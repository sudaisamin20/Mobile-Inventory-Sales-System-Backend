import { prisma } from "../config/dbConfig.ts";
import type { IDeviceReqData } from "../interfaces/device.interface.ts";
import { createHistoryService } from "./history.service.ts";

export const addDeviceService = async (data: IDeviceReqData) => {
  const results = [];

  for (const variant of data.variants) {
    for (const unit of variant.units) {
      const imei1 = unit.imei1?.replace(/\D/g, "");
      const imei2 = unit.imei2?.replace(/\D/g, "");

      if (!imei1) {
        throw new Error("IMEI1 is required");
      }

      // Check duplicate IMEI
      const existingDevice = await prisma.device.findUnique({
        where: { imei1 },
      });

      if (existingDevice) {
        throw new Error(`Device already exists: ${imei1}`);
      }

      // Extract TAC and Serial Number
      const tacCode = imei1.slice(0, 8);
      const serialNumber = imei1.slice(8, 14);

      const created = await prisma.device.create({
        data: {
          imei1,
          imei2: imei2 || null,

          tacCode,
          serialNumber,

          brand: data.brand,
          model: data.model,

          variant: variant.storage,
          color: variant.color,

          countryVersion: data.countryVersion || "",
          ptaStatus: data.ptaStatus,
          networkLockStatus: data.networkLockStatus,

          condition: data.condition,

          batteryHealth: data.batteryHealth,

          screenCondition: data.screenCondition,
          cameraCondition: data.cameraCondition,
          speakerCondition: data.speakerCondition,
          chargingCondition: data.chargingCondition,

          faceIdStatus: data.faceIdStatus,
          fingerprintStatus: data.fingerprintStatus,

          waterpakStatus: "Available",

          // Use variant prices
          purchasePrice: variant.purchasePrice,
          sellingPrice: variant.sellingPrice,

          supplierName: data.supplierName,

          purchaseDate: new Date(data.purchaseDate),

          invoiceNumber: data.invoiceNumber,

          warrantyDays: data.warrantyDays,

          quantity: 1,

          frontImage: data.images?.front || null,
          backImage: data.images?.back || null,
          invoiceImage: data.images?.invoice || null,
        },
      });

      results.push(created);

      await createHistoryService({
        deviceId: created.id,
        type: "ADDED",
        note: "Device added to inventory",
        performedBy: "Admin",
      });
    }
  }

  return {
    success: true,
    count: results.length,
    devices: results,
  };
};

export const getAllDevicesService = async () => {
  return await prisma.device.findMany({
    where: {
      deviceStatus: "IN_STOCK",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAllDevicesByModelUnitsService = async () => {
  return await prisma.device.findMany({
    select: {
      id: true,
      model: true,
      brand: true,
      color: true,
      variant: true,
      frontImage: true,
      purchasePrice: true,
      sellingPrice: true,
      purchaseDate: true,
    },
    where: {
      deviceStatus: "IN_STOCK",
    },
  });
};

export const updateDeviceService = async (
  id: string,
  data: Partial<IDeviceReqData>,
) => {
  const existingDevice = await prisma.device.findUnique({
    where: {
      id,
    },
  });
  console.log(
    "iiiiiiiiiiidddddddddd: ",
    id,
    "daaaaaaaaaaaattttttttaaaaa:",
    data,
  );

  if (!existingDevice) {
    throw new Error("Device not found");
  }

  const updateData: any = {};
  const changes: string[] = [];

  const trackChange = (fieldName: string, oldValue: any, newValue: any) => {
    if (newValue !== undefined && oldValue !== newValue) {
      changes.push(`${fieldName}: ${oldValue ?? "N/A"} → ${newValue}`);
    }
  };

  trackChange("IMEI1", existingDevice.imei1, data.imei1);
  trackChange("IMEI2", existingDevice.imei2, data.imei2);
  trackChange("Brand", existingDevice.brand, data.brand);
  trackChange("Model", existingDevice.model, data.model);
  trackChange("Variant", existingDevice.variant, data.variant);
  trackChange("Color", existingDevice.color, data.color);
  trackChange(
    "Country Version",
    existingDevice.countryVersion,
    data.countryVersion,
  );
  trackChange("PTA Status", existingDevice.ptaStatus, data.ptaStatus);
  trackChange(
    "Network Lock",
    existingDevice.networkLockStatus,
    data.networkLockStatus,
  );
  trackChange("Condition", existingDevice.condition, data.condition);
  trackChange(
    "Battery Health",
    existingDevice.batteryHealth,
    data.batteryHealth,
  );
  trackChange(
    "Purchase Price",
    existingDevice.purchasePrice,
    data.purchasePrice,
  );
  trackChange("Selling Price", existingDevice.sellingPrice, data.sellingPrice);
  trackChange("Supplier", existingDevice.supplierName, data.supplierName);

  if (data.imei1 !== undefined) updateData.imei1 = data.imei1;
  if (data.imei2 !== undefined) updateData.imei2 = data.imei2;
  if (data.tacCode !== undefined) updateData.tacCode = data.tacCode;
  if (data.serialNumber !== undefined)
    updateData.serialNumber = data.serialNumber;
  if (data.brand !== undefined) updateData.brand = data.brand;
  if (data.model !== undefined) updateData.model = data.model;
  if (data.variant !== undefined) updateData.variant = data.variant;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.countryVersion !== undefined)
    updateData.countryVersion = data.countryVersion;
  if (data.ptaStatus !== undefined) updateData.ptaStatus = data.ptaStatus;
  if (data.networkLockStatus !== undefined)
    updateData.networkLockStatus = data.networkLockStatus;
  if (data.condition !== undefined) updateData.condition = data.condition;
  if (data.batteryHealth !== undefined)
    updateData.batteryHealth = data.batteryHealth;
  if (data.screenCondition !== undefined)
    updateData.screenCondition = data.screenCondition;
  if (data.cameraCondition !== undefined)
    updateData.cameraCondition = data.cameraCondition;
  if (data.speakerCondition !== undefined)
    updateData.speakerCondition = data.speakerCondition;
  if (data.chargingCondition !== undefined)
    updateData.chargingCondition = data.chargingCondition;
  if (data.faceIdStatus !== undefined)
    updateData.faceIdStatus = data.faceIdStatus;
  if (data.fingerprintStatus !== undefined)
    updateData.fingerprintStatus = data.fingerprintStatus;
  if (data.waterpakStatus !== undefined)
    updateData.waterpakStatus = data.waterpakStatus;
  if (data.purchasePrice !== undefined)
    updateData.purchasePrice = data.purchasePrice;
  if (data.sellingPrice !== undefined)
    updateData.sellingPrice = data.sellingPrice;
  if (data.supplierName !== undefined)
    updateData.supplierName = data.supplierName;
  if (data.invoiceNumber !== undefined)
    updateData.invoiceNumber = data.invoiceNumber;
  if (data.warrantyDays !== undefined)
    updateData.warrantyDays = data.warrantyDays;

  if (data.purchaseDate) {
    updateData.purchaseDate = new Date(data.purchaseDate);
  }

  if (data.images?.front !== undefined) {
    updateData.frontImage = data.images.front;
  }

  if (data.images?.back !== undefined) {
    updateData.backImage = data.images.back;
  }

  if (data.images?.invoice !== undefined) {
    updateData.invoiceImage = data.images.invoice;
  }

  const updatedDevice = await prisma.device.update({
    where: {
      id,
    },
    data: updateData,
  });

  if (changes.length > 0) {
    await createHistoryService({
      deviceId: id,
      type: "UPDATED",
      note: changes.join(" | "),
      performedBy: "Admin",
    });
  }

  return updatedDevice;
};

export const soldDeviceService = async (id: string) => {
  const device = await prisma.device.findUnique({
    where: {
      id,
    },
  });
  return device;
};

export const deleteDeviceService = async (id: string) => {
  await prisma.deviceHistory.deleteMany({
    where: { deviceId: id },
  });

  return prisma.device.delete({
    where: { id },
  });
};
