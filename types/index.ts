export interface Tradeline {
  id: string | number;
  bank: string;
  bankSubtext?: string;
  cardType: string;
  limit: number;
  age: number;
  purchaseDeadline: string;
  reportingDate: string;
  price: number;
  spotsAvailable: number;
  status: string;
}
