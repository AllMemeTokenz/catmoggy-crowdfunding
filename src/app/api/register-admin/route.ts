import { connectDB } from '@/lib/connectDB';
import { Users } from '@/models/users';
import { registerAdminVal } from '@/validations/registerAdminVal';
import { NextRequest, NextResponse } from 'next/server';
import * as v from 'valibot';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { username, password } = v.parse(registerAdminVal, body);

    await connectDB();

    const existUser = await Users.findOne({ username });
    if (existUser) {
      return NextResponse.json({ error: 'Username already used.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({ username, password: hashedPassword, role: 'admin' });

    return NextResponse.json({ message: 'User registered.' });
  } catch (error) {
    console.error('Error : ', error);
    return NextResponse.json({ error: 'Internal server error', detail: (error as Error).message }, { status: 500 });
  }
};
