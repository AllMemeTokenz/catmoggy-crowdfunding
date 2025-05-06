import { Types } from 'mongoose';

export interface IDonation {
  donor: string;
  amount: number;
  receipt: string;
  currency: 'catmoggy' | 'sol';
  project: {
    id: Types.ObjectId;
    title: string;
  };
  deletedAt: { type: Date; default: null };
  deleteComment: { type: string; default: null };
}
