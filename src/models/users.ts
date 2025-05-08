import { IUser } from '@/types/usersSchemaType';
import { model, models, Schema } from 'mongoose';

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
    },
  },
  { timestamps: true }
);

const userModelName = 'User';
export const Users = models[userModelName] || model<IUser>(userModelName, userSchema);
