import prisma from '../utils/prisma';

export async function getReviews() {
  const reviews = prisma.review.findMany();
  return reviews;
}

export async function getReviewsForBootcamp(bootcampId: string) {
  const reviews = await prisma.review.findMany({ where: { bootcampId } });
  return reviews;
}

export async function getReview(id: string) {
  const review = prisma.review.findUnique({ where: { id } });
  return review;
}

export async function addReview(data: any) {
  const review = await prisma.review.create({ data });
  return review;
}

export async function updateReview(id: string, data: any) {
  const review = prisma.review.update({ where: { id }, data });
  return review;
}

export async function deleteReview(id: string) {
  const review = prisma.review.delete({ where: { id } });
  return review;
}
