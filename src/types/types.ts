// src/types/types.ts
export interface ApiDonationItem {
  _id?: string;
  id?: string;
  imageUrl?: string;
  category?: string;
  title?: string;
  description?: string;
  currentFunding?: number;
  targetFunding?: number;
  statusLabel?: string;
}

export interface DonationCardData {
  id: string;
  imageUrl?: string;
  category?: string;
  title?: string;
  description?: string;
  raised: string;
  percentFunded: number;
  badgeText?: string;
}
