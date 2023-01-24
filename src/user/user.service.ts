import argon from 'argon2';

import { SignUpData } from '../auth/auth.schema';
import prisma, { sel } from '../utils/prisma';

export const createUser = async (data: SignUpData) => {
  const { password } = data;
  const hashedPassword = await argon.hash(password);

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: sel('id', 'name', 'email', 'role'),
  });

  return user;
};

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email },
  });

export const getUserById = async (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: sel('id', 'name', 'email', 'role'),
  });
