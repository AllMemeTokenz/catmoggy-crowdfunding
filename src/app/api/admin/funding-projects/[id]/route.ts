import { connectDB } from '@/lib/connectDB';
import { FundProject } from '@/models/fundProjects';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import * as v from 'valibot';
import { updateProjectSchema } from '@/validations/projectUpdateValidation';
import { isDeepStrictEqual } from 'node:util';
import cloudinaryImageHandler from '@/lib/cloudinaryImageHandler';

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
    await connectDB();
    const formData = await req.formData();
    const { id } = await params;
    const file = formData.get('file') as Blob | null;
    let isSame = true;
    let updateFile = false;
    let imageVersion = '';

    const project = await FundProject.findById(id).select('-deletedAt -__v -comments -donations -currentFunding');

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    console.log('is file available : ', file);
    if (file !== null && file instanceof Blob) {
      updateFile = true;
      const res = await cloudinaryImageHandler('UPDATE', file, project.image);
      console.log('Cloudinary response:', res);
      imageVersion = res.version.toString();
    }

    const data = {
      title: formData.get('title') as string | null,
      subTitle: formData.get('subTitle') as string | null,
      description: formData.get('description') as string | null,
      statusLabel: formData.get('statusLabel') as string | null,
      category: formData.get('category') as string | null,
      expiredDate: formData.get('expiredDate') as string | null,
      targetFunding: formData.get('targetFunding') ? Number(formData.get('targetFunding')) : null,
      currency: formData.get('currency') as string | null,
      image: project.image,
      imageVersion: imageVersion,
    };

    const validatedData = v.parse(updateProjectSchema, data);

    if (updateFile === false) {
      console.log('RUNNING REQUEST CHECK, IS UPDATE OR NOT');

      const projectObj = project.toObject();

      for (const [key, value] of formData.entries()) {
        if (key === 'targetFunding') {
          console.log(key);
          const check = isDeepStrictEqual(Number(value), projectObj[key]);
          console.log('check : ', check);
          if (!check) {
            isSame = false;
            break;
          }
        } else if (key === 'expiredDate') {
          console.log(key);
          const check = new Date(value as string).toISOString() === new Date(projectObj[key]).toISOString();
          console.log('check : ', check);
          if (!check) {
            isSame = false;
            break;
          }
        } else if (key === 'file') {
          console.log('file key, skipping');
          continue;
        } else {
          console.log(key);
          const check = isDeepStrictEqual(value, projectObj[key]);
          console.log('check : ', check);
          if (!check) {
            isSame = false;
            break;
          }
        }
      }

      console.log('isSame : ', isSame);
      if (isSame) {
        return NextResponse.json({ message: 'No changes detected.', changed: false }, { status: 200 });
      }
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
