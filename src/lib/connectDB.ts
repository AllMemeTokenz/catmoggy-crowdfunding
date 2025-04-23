/* eslint-disable no-var */
import mongooseModule from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri: string = MONGODB_URI;

declare global {
  var mongoose:
    | {
        conn: typeof mongooseModule | null;
        promise: Promise<typeof mongooseModule> | null;
      }
    | undefined;
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: {
    conn: typeof mongooseModule | null;
    promise: Promise<typeof mongooseModule> | null;
  };
};

export async function connectDB() {
  // initialize if not defined
  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = {
      conn: null,
      promise: null,
    };
  }

  const cached = globalWithMongoose.mongoose;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongooseModule.connect(uri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
