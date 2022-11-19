import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))

async function importData() {
  await prisma.user.createMany({
    data: users,
  })

  console.log('Data Destroyed')
  process.exit()
}

async function deleteData() {
  await prisma.user.deleteMany()
  console.log('Data Destroyed')
  process.exit()
}

async function main() {
  if (process.argv[2] === '-i') {
    await importData()
  } else if (process.argv[2] === '-d') {
    await deleteData()
  }
}

main()
