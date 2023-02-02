import prisma from '../utils/prisma';

export const getAllReviews = () => prisma.review.findMany();

export const getReviewsForBootcamp = (bootcampId: string) =>
  prisma.review.findMany({ where: { bootcampId } });

export const getReview = (id: string) =>
  prisma.review.findUnique({ where: { id } });

export const createReview = (data: any) => prisma.review.create(data);

export const updateReview = (id: string, data: any) =>
  prisma.review.update({ where: { id }, data });

export const deleteReview = (id: string) =>
  prisma.review.delete({ where: { id } });
