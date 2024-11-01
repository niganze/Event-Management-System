// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';


export async function POST(req: Request) {
  await dbConnect();

  const { name, email, username, password } = await req.json();

  // Check if the user already exists
  const existingUser = await User.findOne({ email:email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 }); // Conflict
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user
  const newUser = new User({ name, email, username, password: hashedPassword });
  
  await newUser.save();

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 }); // Created
}
