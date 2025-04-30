import { connectDB } from '@/lib/connectDB';
import { FundProject } from '@/models/fundProjects';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();

    const { id } = await params;
    const deletedAt = new Date();

    const project = await FundProject.findByIdAndUpdate(id, { deletedAt }, { new: true });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.deletedAt) {
      return NextResponse.json({ error: 'Project already deleted' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
