import argon from 'argon2'
import { PrismaClient, Role } from '@prisma/client'
import * as data from './data-loader'

const db = new PrismaClient()

async function cleanDb() {
  await db.review.deleteMany()
  await db.bootcamp.deleteMany()
  await db.user.deleteMany()
}

async function seedUsers() {
  const hash = await argon.hash('123456')

  await db.user.createMany({
    data: data.users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      password: hash,
      role: u.role.toUpperCase() as Role,
    })),
  })
}

async function seedBootcamps() {
  await db.bootcamp.createMany({
    data: data.bootcamps.map((b) => ({
      id: b._id,
      name: b.name,
      description: b.description,
      website: b.website,
      address: b.address,
      careers: b.careers,
      publisherId: b.user,
    })),
  })
}

async function seedReviews() {
  await db.review.createMany({
    data: data.reviews.map((r) => ({
      id: r._id,
      title: r.title,
      content: r.text,
      rating: Number(r.rating),
      bootcampId: r.bootcamp,
      userId: r.user,
    })),
  })
}

async function main() {
  const cmd = process.argv[2]

  if (cmd === '-i') {
    await cleanDb()
    await seedUsers()
    await seedBootcamps()
    await seedReviews()
  } else if (cmd === '-d') {
    await cleanDb()
  } else {
    console.log('use -i or -d')
  }

  await db.$disconnect()
}

main()
