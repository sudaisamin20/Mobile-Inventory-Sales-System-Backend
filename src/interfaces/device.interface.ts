export type DeviceCondition = "new" | "used" | "open-box" | "refurbished";

export type PTAStatus = "approved" | "pending" | "blocked" | "unknown";

export type NetworkLockStatus = "unlocked" | "locked" | "unknown";

export interface IDeviceImages {
  front?: string;
  back?: string;
  invoice?: string;
}

export interface IDeviceReqData {
  // Unique per device
  imei1: string;
  imei2?: string;

  tacCode: string;
  serialNumber: string;

  // Device Information
  brand: string;
  model: string;
  variant: string;
  color: string;
  countryVersion: string;

  // Status
  ptaStatus: PTAStatus;
  networkLockStatus: NetworkLockStatus;
  condition: DeviceCondition;

  // Hardware Condition
  batteryHealth: number;
  screenCondition: string;
  cameraCondition: string;
  speakerCondition: string;
  chargingCondition: string;
  faceIdStatus: string;
  fingerprintStatus: string;
  waterpakStatus: string;

  // Pricing
  purchasePrice: number;
  sellingPrice: number;

  variants: [
    {
      units: [
        {
          imei1: string;
          imei2: string;
        },
      ];
      color: string;
      variant: string;
      storage: string;
      quantity: number;
      purchasePrice: number;
      sellingPrice: number;
    },
  ];
  units: number;
  colors: string;

  // Supplier
  supplierName: string;
  purchaseDate: string;
  invoiceNumber: string;

  // Warranty
  warrantyDays: number;

  // Inventory
  quantity: number;

  // Images
  images: IDeviceImages;
}

export interface ISoldDeviceInfo {
  id: string;
  invoiceNo: string;
  customerName: string;
  phoneNo: string;
  soldPrice: number;
  soldAt: string;
  paymentType: PaymentType | undefined;
  notes: string;
  deviceId: string;
  remainingAmount?: string;
  receivedAmount?: string;
  paymentStatus: PaymentStatus;
  brand?: string;
  model?: string;
  imei1?: string;
  imei2?: string;
  variant?: string;
  color?: string;
}

type PaymentType =
  | "CASH"
  | "EASYPAISA"
  | "JAZZCASH"
  | "BANK_TRANSFER";

type PaymentStatus = "PAID" | "PENDING" | "REFUND" | "CANCELLED";
