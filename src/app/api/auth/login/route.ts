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
  
  // Find the user by username
  const user = await User.findOne({ username });
  
  // If user not found or password is incorrect
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }); // Unauthorized
  }

  // Create a token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  // Set the token in cookies (HttpOnly)
  const res = NextResponse.json({ message: 'Login successful' });
  res.cookies.set('token', token, { httpOnly: true, path: '/' });

  return res;
}
