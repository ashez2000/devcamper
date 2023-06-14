import path from 'path'
import fs from 'fs'

const read = (name: string) => {
    const dataPath = path.resolve(__dirname, `../seeder/data/${name}.json`)
    return fs.readFileSync(dataPath, 'utf-8')
}

export type UserData = {
    _id: string
    name: string
    email: string
    password: string
    role: string
}

export type BootcampData = {
    _id: string
    user: string
    name: string
    description: string
    website: string
    phone: string
    email: string
    address: string
    careers: Array<string>
    photo: string
    housing: boolean
    jobAssistance: boolean
    jobGuarantee: boolean
    acceptGi: boolean
}

export type ReviewData = {
    _id: string
    title: string
    text: string
    rating: string
    bootcamp: string
    user: string
}

export const users = JSON.parse(read('users')) as Array<UserData>
export const bootcamps = JSON.parse(read('bootcamps')) as Array<BootcampData>
export const reviews = JSON.parse(read('reviews')) as Array<ReviewData>
