import db from '@/utils/prisma'
import { AppError, UnauthorizedError } from '@/utils/app-error'
import { JwtPayload } from '@/utils/jwt'
import { ReviewCreateSchema } from '@/schemas/review-schema'

const ReviewNotFoundError = () => new AppError('Review not found!', 404)

async function saveAvgRating(bootcampId: string) {
  const aggr = await db.review.aggregate({
    where: {
      bootcampId,
    },
    _avg: {
      rating: true,
    },
  })

  const avgRating = aggr._avg.rating
  if (avgRating) {
    await db.bootcamp.update({
      where: { id: bootcampId },
      data: {
        averageRating: avgRating,
      },
    })
  }
}

export async function createReview(
  bootcampId: string,
  data: unknown,
  auth: JwtPayload
) {
  const { title, content, rating } = ReviewCreateSchema.parse(data)

  const review = await db.review.create({
    data: {
      title: title,
      content: content,
      rating: rating,
      bootcampId: bootcampId,
      userId: auth.id,
    },
  })

  await saveAvgRating(bootcampId)

  return review
}

export async function findReviews() {
  const reviews = await db.review.findMany()
  return reviews
}

export async function findReviewsForBootcamp(bootcampId: string) {
  const reviews = await db.review.findMany({ where: { bootcampId } })
  return reviews
}

export async function findReviewById(id: string) {
  const review = await db.review.findUnique({ where: { id } })
  if (!review) {
    throw ReviewNotFoundError()
  }

  return review
}

export async function updateReview(
  id: string,
  data: unknown,
  auth: JwtPayload
) {
  const review = await findReviewById(id)
  if (review.userId !== auth.id) {
    throw UnauthorizedError()
  }

  const res = ReviewCreateSchema.partial().parse(data)

  const update = await db.review.update({ where: { id }, data: res })
  await saveAvgRating(review.bootcampId)
  return update
}

export async function deleteReview(id: string, auth: JwtPayload) {
  const review = await findReviewById(id)
  if (review.userId !== auth.id && auth.role !== 'ADMIN') {
    throw UnauthorizedError()
  }

  const deleted = await db.review.delete({ where: { id } })
  await saveAvgRating(review.bootcampId)
  return deleted
}
