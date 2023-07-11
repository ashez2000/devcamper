import db from '$/lib/prisma'

export async function findAllByBootcampId(
  bootcampId: string,
  { page = 1, limit = 10 }
) {
  const reviews = db.review.findMany({
    where: { bootcampId },
    skip: (page - 1) * limit,
    take: limit,
  })

  return reviews
}

export async function findById(id: string) {
  return db.review.findUnique({ where: { id } })
}

export async function create(data: any) {
  const review = await db.review.create({ data })
  await average(review.bootcampId)

  return review
}

export async function update(id: string, data: any) {
  const review = await db.review.update({ where: { id }, data })

  if (data.rating) {
    await average(review.bootcampId)
  }

  return review
}

export async function remove(id: string) {
  const review = await db.review.delete({ where: { id } })
  await average(review.bootcampId)

  return review
}

async function average(bootcampId: string) {
  const res = await db.review.aggregate({
    where: { bootcampId },
    _avg: { rating: true },
  })

  const avg = res._avg.rating?.toFixed(1)

  if (avg) {
    await db.bootcamp.update({
      where: { id: bootcampId },
      data: { avgRating: parseFloat(avg) },
    })
  }
}
