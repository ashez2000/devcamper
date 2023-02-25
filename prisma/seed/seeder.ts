import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const read = (name: string) => {
  const path = `${__dirname}/${name}.json`;
  return fs.readFileSync(path, 'utf-8');
};

const users = JSON.parse(read('users'));
const bootcamps = JSON.parse(read('bootcamps'));
const courses = JSON.parse(read('courses'));
const reviews = JSON.parse(read('reviews'));

async function deleteData() {
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.bootcamp.deleteMany();
  await prisma.user.deleteMany();

  console.log('Data Destroyed');
}

async function importData() {
  await deleteData();
  await prisma.user.createMany({ data: users });
  await prisma.bootcamp.createMany({ data: bootcamps });
  await prisma.course.createMany({ data: courses });
  await prisma.review.createMany({ data: reviews });

  console.log('Data Imported');
}

async function main() {
  const flag = process.argv[2];
  flag === '-d' ? deleteData() : importData();

  prisma.$disconnect();
}

main();
