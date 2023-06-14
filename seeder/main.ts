import argon from 'argon2'
import { PrismaClient } from '@prisma/client'
import { users, bootcamps, reviews } from './loader'

const prisma = new PrismaClient()

async function deleteData() {
    await prisma.review.deleteMany()
    await prisma.bootcamp.deleteMany()
    await prisma.user.deleteMany()

    console.log('seeder: data deleted')
}

async function seedUsers() {
    const dbUsers = await Promise.all(
        users.map(async (user) => {
            const password = await argon.hash(user.password)
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                password,
                role: user.role,
            }
        })
    )

    await prisma.user.createMany({ data: dbUsers })
}

async function seedBootcamps() {
    const dbBootcamps = await Promise.all(
        bootcamps.map((bootcamp) => {
            const avgRating =
                reviews.reduce((acc, review) => {
                    if (review.bootcamp === bootcamp._id) {
                        return acc + parseInt(review.rating)
                    }
                    return acc
                }, 0) /
                reviews.reduce((acc, review) => {
                    if (review.bootcamp === bootcamp._id) {
                        return acc + 1
                    }
                    return acc
                }, 0)

            return {
                id: bootcamp._id,
                name: bootcamp.name,
                description: bootcamp.description,
                avgRating: parseFloat(avgRating.toFixed(1)),
                userId: bootcamp.user,
            }
        })
    )

    await prisma.bootcamp.createMany({ data: dbBootcamps })
}

async function seedReviews() {
    const dbReviews = await Promise.all(
        reviews.map((review) => {
            return {
                id: review._id,
                title: review.title,
                text: review.text,
                rating: parseInt(review.rating),
                bootcampId: review.bootcamp,
                userId: review.user,
            }
        })
    )

    await prisma.review.createMany({ data: dbReviews })
}

async function importData() {
    await deleteData()

    await seedUsers()
    await seedBootcamps()
    await seedReviews()

    console.log('seeder: data imported')
}

async function main() {
    const flag = process.argv[2]
    flag === '-d' ? deleteData() : importData()

    prisma.$disconnect()
}

main()
