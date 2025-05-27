import { connectDB } from '@/lib/connectDB';
import { FundProject } from '@/models/fundProjects';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryImageHandler from '@/lib/cloudinaryImageHandler';
import { projectSchema } from '@/validations/projectSchema';
import * as v from 'valibot';

cloudinary.config({
  secure: true,
});

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    const title = formData.get('title') as string | null;
    const subTitle = formData.get('subTitle') as string | null;
    const description = formData.get('description') as string | null;
    const statusLabel = formData.get('statusLabel') as string | null;
    const category = formData.get('category') as string | null;
    const expiredDate = formData.get('expiredDate') as string | null;
    const targetFunding = formData.get('targetFunding') as number | null;
    const currency = formData.get('currency') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'File blob is required' }, { status: 400 });
    }
    const cloudinaryRes = await cloudinaryImageHandler('UPLOAD', file);
    const data = {
      title,
      subTitle,
      statusLabel,
      category,
      description,
      expiredDate,
      targetFunding: Number(targetFunding),
      currency,
      image: cloudinaryRes.display_name,
      imageVersion: cloudinaryRes.version.toString(),
    };
    const parsedData = v.parse(projectSchema, data);

    await connectDB();

    const newProject = new FundProject(parsedData);
    console.log('Parsed data:', parsedData);
    await newProject.save();

    // return NextResponse.json({ message: 'File received', parsedData }, { status: 200 });
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

    console.log('Fetched projects:', projects);

    return NextResponse.json({ message: 'Projects fetched successfully', data: projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Error fetching projects', detail: (error as Error).message }, { status: 500 });
  }
};
