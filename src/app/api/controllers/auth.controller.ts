import argon from 'argon2'
import { Request, Response } from 'express'
import * as userRepo from '../../../db/repo/user.repo'

export async function signup(req: Request, res: Response) {
    const data = req.body
    const user = await userRepo.create(data)
    res.status(200).json({})
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

    res.status(200).json({})
}
