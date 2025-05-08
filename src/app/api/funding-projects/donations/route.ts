import { connectDB } from '@/lib/connectDB';
import { Donation } from '@/models/donations';
import { delDonationVal } from '@/validations/donationsValidation';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import * as v from 'valibot';

export const PATCH = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const donationId = params.get('donation');
  const body = await req.json();

  if (!donationId || !Types.ObjectId.isValid(donationId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await connectDB();
    const validatedBody = v.parse(delDonationVal, body);

    const donationData = await Donation.findOne({ _id: donationId, deletedAt: null, deleteComment: null });

    if (!donationData) {
      return NextResponse.json({ error: 'Data not found.' }, { status: 404 });
    }

    donationData.deletedAt = new Date();
    donationData.deleteComment = validatedBody.deleteComment;

    await donationData.save();

    return NextResponse.json({ message: 'Donation deleted successfully.' });
  } catch (error) {
    console.error('Error : ', error);
    return NextResponse.json({ error: 'Internal server error', detail: (error as Error).message }, { status: 500 });
  }
};
