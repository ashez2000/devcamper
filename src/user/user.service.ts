import argon from 'argon2';

import { SignUpData } from '../auth/auth.schema';
import prisma from '../utils/prisma';

export async function createUser(data: SignUpData) {
  const { name, email, password, role } = data;
  const hash = await argon.hash(password);

  return prisma.user.create({
    data: { name, email, password: hash, role },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function cmpPassword(hash: string, password: string) {
  return argon.verify(hash, password);
}
