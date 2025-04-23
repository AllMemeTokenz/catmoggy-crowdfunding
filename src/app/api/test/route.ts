import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDB();
    return NextResponse.json({ message: 'MongoDB is connected!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data', detail: (error as Error).message }, { status: 500 });
  }
};
