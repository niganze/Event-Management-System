// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();
  
  
  const user = await User.findOne({ username });
  
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }); 
  }

  
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  
  const res = NextResponse.json({ message: 'Login successful' });
  res.cookies.set('token', token, { httpOnly: true, path: '/' });

  return res;
}
