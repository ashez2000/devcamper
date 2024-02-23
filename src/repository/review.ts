import db from '@/utils/prisma'
import { ReviewInput } from '@/schemas/review'

// Find all reviews for bootcamp
export const findManyForBootcamp = async (bootcampId: string) => {
  const reviews = await db.review.findMany({
    where: {
      bootcampId,
    },

    select: {
      id: true,
      title: true,
      content: true,
      rating: true,

      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return reviews
}

// Find review by id
export const findById = async (id: string) => {
  const review = await db.review.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      title: true,
      content: true,
      rating: true,
      userId: true,
    },
  })

  return review
}

// Create new review
export const create = async (
  data: ReviewInput,
  bootcampId: string,
  userId: string
) => {
  const { title, content, rating } = data

  const review = await db.review.create({
    data: {
      title,
      content,
      rating,
      bootcampId,
      userId,
    },

    select: {
      id: true,
      title: true,
      content: true,
      rating: true,
    },
  })

  return review
}

// Update review
export const update = async (id: string, data: Partial<ReviewInput>) => {
  const { title, content, rating } = data

  const review = await db.review.update({
    where: {
      id,
    },

    data: {
      title,
      content,
      rating,
    },

    select: {
      id: true,
      title: true,
      content: true,
      rating: true,
    },
  })

  return review
}

// Remove review
export const remove = async (id: string) => {
  await db.review.delete({
    where: {
      id,
    },
  })
}
