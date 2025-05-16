import { connectDB } from '@/lib/connectDB';
import { FundProject } from '@/models/fundProjects';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import * as v from 'valibot';
import { updateProjectSchema } from '@/validations/projectUpdateValidation';
import { isDeepStrictEqual } from 'node:util';

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

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const body = await req.json();
    const { id } = await params;

    const validatedData = v.parse(updateProjectSchema, body);

    await connectDB();

    const project = await FundProject.findById(id).select('-deletedAt -__v -comments -donations -currentFunding');

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const isSame = Object.entries(validatedData).every(([key, value]) => {
      return isDeepStrictEqual(value, project.get(key));
    });

    if (isSame) {
      return NextResponse.json({ message: 'No changes detected.', changed: false }, { status: 200 });
    }

    Object.assign(project, validatedData);
    await project.save();

    return NextResponse.json(
      { message: 'Project updated successfully', changed: true, data: project },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal server error', detail: (error as Error).message }, { status: 500 });
  }
};
