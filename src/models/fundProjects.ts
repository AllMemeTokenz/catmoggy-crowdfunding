import { IComment, IProject } from '@/types/fundProjectsTypes';
import { Schema, models, model } from 'mongoose';

const commentSchema = new Schema<IComment>(
  {
    user: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    statusLabel: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    imageVersion: { type: String, required: true },
    expiredDate: { type: Date, required: true },
    currency: {
      type: String,
      enum: ['catmoggy', 'sol'],
      default: 'catmoggy',
    },
    targetFunding: { type: Number, required: true, min: [1, 'Target funding must be greater than 0.'] },
    currentFunding: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    comments: { type: [commentSchema], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const FundProject = models.Project || model<IProject>('Project', projectSchema);
