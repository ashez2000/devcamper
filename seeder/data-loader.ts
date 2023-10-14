import fs from 'node:fs'

function loadDataFromFile(path: string) {
  const data = fs.readFileSync(path, 'utf-8')
  return JSON.parse(data)
}

type UserData = {
  _id: string
  name: string
  email: string
  password: string
  role: string
}

type BootcampData = {
  _id: string
  name: string
  description: string
  user: string
}

type ReviewData = {
  _id: string
  title: string
  text: string
  rating: string
  user: string
  bootcamp: string
}

export const users = loadDataFromFile('./data/users.json') as UserData[]

export const bootcamps = loadDataFromFile(
  './data/bootcamps.json'
) as BootcampData[]

export const reviews = loadDataFromFile('./data/reviews.json') as ReviewData[]
