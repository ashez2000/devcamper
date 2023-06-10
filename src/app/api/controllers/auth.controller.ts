import argon from 'argon2'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import * as userRepo from '../../../db/repo/user.repo'

export async function signup(req: Request, res: Response) {
    const data = req.body
    const user = await userRepo.create(data)
    const token = generateToken(user)

    res.status(200).json({ token })
}

export async function signin(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await userRepo.findByEmail(email)

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await argon.verify(user.password, password)

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user)

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
