import prisma from '../utils/prisma';

export const getAllCourses = () => prisma.course.findMany();

export const getCoursesForBootcamp = (bootcampId: string) =>
  prisma.course.findMany({ where: { bootcampId } });

export const getCourse = (id: string) =>
  prisma.course.findUnique({ where: { id } });

export const createCourse = (data: any) => prisma.course.create({ data });

export const updateCourse = (id: string, data: any) =>
  prisma.course.update({ where: { id }, data });

export const deleteCourse = (id: string) =>
  prisma.course.delete({ where: { id } });
