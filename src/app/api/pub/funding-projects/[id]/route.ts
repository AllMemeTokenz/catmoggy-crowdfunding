import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { Types } from 'mongoose';
import { FundProject } from '@/models/fundProjects';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    const project = await FundProject.findOne({ _id: id, deletedAt: null }).select('-deletedAt -__v');

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project fetched successfully', data: project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
