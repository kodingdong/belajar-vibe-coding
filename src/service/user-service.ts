import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const registerUser = async (payload: any) => {
  const { name, email, password } = payload;

  // 1. Check if email exists
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    throw new Error('email sudah digunakan');
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert user
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: true };
};

export const loginUser = async (payload: any) => {
  const { email, password } = payload;

  // 1. Find user by email
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (user.length === 0) {
    throw new Error('email atau password salah');
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    throw new Error('email atau password salah');
  }

  return { 
    success: true, 
    data: {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email
    }
  };
};
