import { connectDB } from '@/lib/connectDB';
import { FundProject } from '@/models/fundProjects';
import { projectSchema } from '@/validations/projectSchema';
import { NextResponse } from 'next/server';
import * as v from 'valibot';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const parsedData = v.parse(projectSchema, body);

    await connectDB();

    const newProject = new FundProject(parsedData);
    await newProject.save();

    return NextResponse.json({ message: 'Project created successfully', data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating project', detail: (error as Error).message }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectDB();

    const projects = await FundProject.find({
      deletedAt: null,
    })
      .select('-deletedAt -comments -donations -description -__v')
      .sort({ createdAt: -1 });

    return NextResponse.json({ message: 'Projects fetched successfully', data: projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Error fetching projects', detail: (error as Error).message }, { status: 500 });
  }
};
