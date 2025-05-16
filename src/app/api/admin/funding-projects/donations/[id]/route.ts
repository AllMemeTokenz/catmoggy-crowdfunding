import { connectDB } from '@/lib/connectDB';
import { Donation } from '@/models/donations';
import { FundProject } from '@/models/fundProjects';
import { newDonationVal } from '@/validations/donationsValidation';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import * as v from 'valibot';

export const POST = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    await connectDB();
    // check if the project exists and is not deleted
    const project = await FundProject.findOne({ _id: id, deletedAt: null }).select('-deletedAt -__v');
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // validate the donation data
    const validatedBody = v.parse(newDonationVal, body);

    const newDonation = {
      ...validatedBody,
      project: {
        id: new Types.ObjectId(id),
        title: project.title,
      },
    };

    const createNewDonation = await Donation.create(newDonation);

    return NextResponse.json({ message: 'Donation added successfully', data: createNewDonation }, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json({ error: 'Internal server error', detail: (error as Error).message }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    await connectDB();
    const project = await FundProject.findOne({ _id: id, deletedAt: null }).select('-deletedAt -__v');
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 400 });
    }

    const donations = await Donation.find({
      'project.id': new Types.ObjectId(id),
      deletedAt: null,
    }).select('-deletedAt -deleteComment -__v');

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations : ', error);
    return NextResponse.json({ error: 'Internal server Error', detail: (error as Error).message });
  }
};
