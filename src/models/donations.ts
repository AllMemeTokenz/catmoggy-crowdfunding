import { IDonation } from '@/types/donationsType';
import { Schema, models, model } from 'mongoose';

const donationSchema = new Schema<IDonation>({
  donor: { type: String, required: true },
  amount: { type: Number, required: true },
  receipt: { type: String, required: true },
  currency: {
    type: String,
    enum: ['catmoggy', 'sol'],
    default: 'catmoggy',
  },
  date: { type: Date, default: Date.now },
  project: {
    id: { type: Schema.Types.ObjectId, ref: 'FundProject', required: true },
    title: { type: String, required: true },
  },
  deletedAt: { type: Date, default: null },
  deleteComment: { type: String, default: null },
});

export const Donation = models.Donation || model<IDonation>('Donation', donationSchema);
