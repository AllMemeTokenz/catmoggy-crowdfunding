import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { FundProject } from '@/models/fundProjects';

export const GET = async () => {
  try {
    await connectDB();

    const projects = await FundProject.find({
      deletedAt: null,
    })
      .select('-deletedAt -comments -donations -description -__v')
      .sort({ createdAt: -1 });

    console.log('Fetched projects:', projects);

    return NextResponse.json({ message: 'Projects fetched successfully', data: projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Error fetching projects', detail: (error as Error).message }, { status: 500 });
  }
};
