import argon from 'argon2'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import * as userRepo from '../../../db/repo/user.repo'
import { SigninSchema, SignupSchema } from '../../../db/schema/user.schema'

export async function signup(req: Request, res: Response) {
    const parsedResutlt = SignupSchema.safeParse(req.body)
    if (!parsedResutlt.success) {
        return res.status(400).json({ message: parsedResutlt.error })
    }

    const user = await userRepo.create(parsedResutlt.data)
    const token = generateToken(user)

    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token })
}

export async function signin(req: Request, res: Response) {
    const parsedResutlt = SigninSchema.safeParse(req.body)
    if (!parsedResutlt.success) {
        return res.status(400).json({ message: parsedResutlt.error })
    }

    const { email, password } = parsedResutlt.data

    const user = await userRepo.findByEmail(email)

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await argon.verify(user.password, password)

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user)

    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token })
}

function generateToken(user: any) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    })

    return token
}
