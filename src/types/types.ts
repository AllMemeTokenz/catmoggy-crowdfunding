// src/types/types.ts
export interface ApiDonationItem {
  _id?: string;
  id?: string;
  image?: string;
  imageVersion?: string;
  category?: string;
  title?: string;
  description?: string;
  currentFunding?: number;
  targetFunding?: number;
  statusLabel?: string;
}

export interface DonationCardData {
  id: string;
  image?: string;
  imageVersion?: string;
  category?: string;
  title?: string;
  description?: string;
  raised: string;
  percentFunded: number;
  badgeText?: string;
}
