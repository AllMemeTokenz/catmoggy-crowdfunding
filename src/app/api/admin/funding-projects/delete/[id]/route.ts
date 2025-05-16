import { connectDB } from '@/lib/connectDB';
import { FundProject } from '@/models/fundProjects';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const { id } = params;

    const project = await FundProject.findById(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    if (project.deletedAt) {
      return NextResponse.json({ error: 'Project already deleted' }, { status: 400 });
    }

    project.deletedAt = new Date();
    await project.save();

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
