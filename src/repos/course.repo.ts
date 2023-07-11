import db from '$/lib/prisma'

export async function findAll({ page = 1, limit = 10 }) {
  const courses = await db.course.findMany({
    skip: (page - 1) * limit,
    take: limit,
  })

  return courses
}

export async function findById(id: string) {
  const course = await db.course.findUnique({
    where: { id },
  })

  return course
}

export async function create(data: any) {
  const course = await db.course.create({
    data,
  })

  await avgCost(data.bootcampId)

  return course
}

export async function update(id: string, data: any) {
  const course = await db.course.update({
    where: { id },
    data,
  })

  if (data.avgCost) {
    await avgCost(data.bootcampId)
  }

  return course
}

export async function remove(id: string) {
  const course = await db.course.delete({
    where: { id },
  })

  await avgCost(course.bootcampId)

  return course
}

async function avgCost(bootcampId: string) {
  const res = await db.course.aggregate({
    where: { bootcampId },
    _avg: { tuition: true },
  })

  const avg = res._avg.tuition?.toFixed(1)

  if (avg) {
    await db.bootcamp.update({
      where: { id: bootcampId },
      data: { avgCost: parseFloat(avg) },
    })
  }
}
