import prisma from '../utils/prisma';
import { paginate } from '../utils/query';

export async function getCourses(query: any) {
  // pagination
  const docCount = await prisma.course.count();
  const { limit, startIndex, res } = paginate(query, docCount);

  const courses = await prisma.course.findMany({
    take: limit,
    skip: startIndex,
  });

  return { courses, pagination: res };
}

export const getCoursesForBootcamp = (bootcampId: string) =>
  prisma.course.findMany({ where: { bootcampId } });

export const getCourse = (id: string) =>
  prisma.course.findUnique({ where: { id } });

export const createCourse = (data: any) => prisma.course.create({ data });

export const updateCourse = (id: string, data: any) =>
  prisma.course.update({ where: { id }, data });

export const deleteCourse = (id: string) =>
  prisma.course.delete({ where: { id } });
