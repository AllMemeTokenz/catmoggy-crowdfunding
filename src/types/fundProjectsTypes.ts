import { Document } from 'mongoose';

export interface IComment {
  user: string;
  comment: string;
  date: Date;
}

export interface IDonation {
  donor: string;
  amount: number;
  currency: 'catmoggy' | 'sol';
  date: Date;
}

export interface IProject extends Document {
  title: string;
  subTitle: string;
  statusLabel: string;
  category: string;
  imageUrl: string;
  expiredDate: Date;
  targetFunding: number;
  currentFunding: number;
  description: string;
  comments: IComment[];
  donations: IDonation[];
  createdAt?: Date;
  updatedAt?: Date;
}
