import { Document } from 'mongoose';

export interface IComment {
  user: string;
  comment: string;
  date: Date;
}

export interface IProject extends Document {
  title: string;
  subTitle: string;
  statusLabel: string;
  category: string;
  image: string;
  imageVersion: string;
  expiredDate: Date;
  currency: 'catmoggy' | 'sol';
  targetFunding: number;
  currentFunding: number;
  description: string;
  comments: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
