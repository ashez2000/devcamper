import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/bootcamps.json`, 'utf-8')
)
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/courses.json`, 'utf-8')
)

async function importData() {
  await prisma.user.createMany({
    data: users,
  })

  await prisma.bootcamp.createMany({
    data: bootcamps,
  })

  await prisma.course.createMany({
    data: courses,
  })

  console.log('Data Imported')
}

async function deleteData() {
  await prisma.bootcamp.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  console.log('Data Destroyed')
}

async function main() {
  await deleteData()
  await importData()

  prisma.$disconnect()
}

main()
