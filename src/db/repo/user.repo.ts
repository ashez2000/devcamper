import argon from 'argon2'

import { db } from '../conn'
import { CreateUserInput } from '../schema/user.schema'

export async function findById(id: string) {
    const user = await db.user.findUnique({ where: { id } })
    return user
}

export async function findByEmail(email: string) {
    const user = await db.user.findUnique({ where: { email } })
    return user
}

export async function create(data: CreateUserInput) {
    const { name, email, password, role } = data
    const hash = await argon.hash(password)

    const user = await db.user.create({
        data: { name, email, password: hash, role },
    })

    return user
}
