export interface ICreateHistory {
  deviceId: string;
  type:
    | "ADDED"
    | "SOLD"
    | "UPDATED"
    | "PRICE_CHANGE"
    | "STATUS_CHANGE"
    | "DELETED"
    | "STOCK_ADDED";

  oldValue?: string;
  newValue?: string;

  note?: string;

  performedBy?: string;
}