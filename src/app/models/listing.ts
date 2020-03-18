export class BidRequest {
  propertyId: string;
  propertyName?: string;
  marketplaceId: string;
  value: number;
  tax: number;
  percent: number;
  amount: number;
  seller: [string];
  buyer: [string];
  contractHash?: string;
  transferDoc?: string; // verify, view
  notary: boolean;
  stampDuty: boolean;
  registered: boolean;
  titleId?: string;
  status: ListingStatus;
  isActive?: boolean;
  id: string;
  // sellerSign: string;
  // buyerSign: string;
}
export enum ListingStatus {
  Requested = "Requested",
  Notarized = "Notarized",
  Registered = "Registered",
  Completed = "Completed",
  Rejected = "Rejected"
}
