import { prisma } from "../config/dbConfig.ts";
import { type ISoldDeviceInfo } from "../interfaces/device.interface.ts";
import { v4 as uuidv4 } from "uuid";
import { generatePDF } from "../utils/generatePDF.ts";
import { formatDateAndTime } from "../utils/formatData&Time.ts";
import { createHistoryService } from "./history.service.ts";

export const soldDeviceService = async (data: ISoldDeviceInfo) => {
  const today = new Date();
  const date =
    today.getFullYear().toString() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  const lastInvoice = await prisma.sales.findFirst({
    where: {
      invoiceNo: {
        startsWith: `BMZ-INV-${date}`,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const nextSequence = lastInvoice
    ? Number(lastInvoice.invoiceNo.split("-").pop()) + 1
    : 1;

  const invoiceNo = `BMZ-INV-${date}-${String(nextSequence).padStart(3, "0")}`;
  const device = await prisma.device.findUnique({
    where: { id: data.deviceId },
  });

  if (!device) {
    throw new Error("Device not found");
  }

  const soldPrice = Number(data.soldPrice);

  const receivedAmount =
    data.receivedAmount !== undefined ? Number(data.receivedAmount) : soldPrice;

  const remainingAmount = soldPrice - receivedAmount;

  const uniqueFileName = uuidv4();

  const paymentStatus = remainingAmount > 0 ? "PENDING" : "PAID";

  const pdfFilePath = await generatePDF(
    "invoice",
    {
      customerName: data.customerName,
      phoneNo: data.phoneNo,
      soldPrice: data.soldPrice,
      receivedAmount,
      remainingAmount,
      soldAt: formatDateAndTime(data.soldAt ?? new Date()),
      paymentType: data.paymentType,
      paymentStatus,
      notes: data.notes,
      invoiceNo,
      brand: data.brand,
      model: data.model,
      imei1: data.imei1,
      imei2: data.imei2,
      variant: data.variant,
      color: data.color,
    },
    uniqueFileName,
  );

  if (!pdfFilePath) {
    throw new Error("PDF generation failed");
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.device.update({
      where: { id: data.deviceId },
      data: {
        deviceStatus: "SOLD",
      },
    });

    return tx.sales.create({
      data: {
        customerName: data.customerName,
        phoneNo: data.phoneNo,
        soldPrice: data.soldPrice,
        receivedAmount,
        remainingAmount,
        paymentStatus,
        soldAt: data.soldAt ?? new Date(),
        paymentType: data.paymentType,
        notes: data.notes,
        invoiceNo,
        deviceId: data.deviceId,
        pdf: pdfFilePath,
      },
    });
  });

  await createHistoryService({
    deviceId: data.deviceId,
    type: "SOLD",
    note: `Sold for Rs ${soldPrice}`,
    performedBy: "Admin",
  });

  return result;
};

export const getSalesDataService = async () => {
  return prisma.sales.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateRemainingAmountPaidStatusService  = async (
  data: ISoldDeviceInfo,
) => {
  const saleInfo = await prisma.sales.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!saleInfo) {
    throw new Error("Sale not found");
  }

  const updatedSale = await prisma.$transaction(async (tx) => {
    const sale = await tx.sales.update({
      where: {
        id: data.id,
      },
      data: {
        remainingAmount: 0,
        receivedAmount: saleInfo.soldPrice,
        paymentStatus: "PAID",
      },
    });

    await tx.deviceHistory.create({
      data: {
        deviceId: sale.deviceId,
        type: "PAYMENT_COMPLETED",
        note: `Remaining amount received. Payment completed.`,
      },
    });

    return sale;
  });

  return updatedSale;
};
