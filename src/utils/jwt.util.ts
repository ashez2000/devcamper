import jwt from 'jsonwebtoken'
import { UserRoles } from '../db/schema/user.schema'

export type AuthPayload = {
    id: string
    email: string
    role: UserRoles
}

export function generateToken(payload: AuthPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

    return token
}
