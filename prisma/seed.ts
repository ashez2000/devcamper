import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/bootcamps.json`, 'utf-8')
)

async function importData() {
  await prisma.user.createMany({
    data: users,
  })

  await prisma.bootcamp.createMany({
    data: bootcamps,
  })

  console.log('Data Imported')
}

async function deleteData() {
  await prisma.user.deleteMany()
  await prisma.bootcamp.deleteMany()

  console.log('Data Destroyed')
}

async function main() {
  await deleteData()
  await importData()

  prisma.$disconnect()
}

main()
