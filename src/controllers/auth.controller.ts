import crypto from 'crypto'
import argon from 'argon2'
import { Request, Response } from 'express'

import { sendEmail } from '../services/email.service'
import { generateToken } from '../utils/jwt.util'
import * as userRepo from '../db/repo/user.repo'
import { SigninSchema, SignupSchema, UserRoles } from '../db/schema/user.schema'

export async function signup(req: Request, res: Response) {
    const parsedResutlt = SignupSchema.safeParse(req.body)
    if (!parsedResutlt.success) {
        return res.status(400).json({ message: parsedResutlt.error })
    }

    const exist = await userRepo.findByEmail(parsedResutlt.data.email)
    if (exist) {
        return res.status(400).json({ message: 'Email already exist' })
    }

    const user = await userRepo.create(parsedResutlt.data)

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role as UserRoles,
    })

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

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role as UserRoles,
    })

    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token })
}

export async function forgotPassword(req: Request, res: Response) {
    const user = await userRepo.findByEmail(req.body.email)
    if (!user) {
        return res
            .status(400)
            .json({ message: 'No user with that email address exists' })
    }

    const resetPasswordToken = crypto.randomBytes(20).toString('hex')
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000
    const hashedToken = await argon.hash(resetPasswordToken)

    await userRepo.update(user.id, {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: new Date(resetPasswordExpire),
    })

    const resetUrl = `${req.protocol}://${req.headers.host}/api/v1/auth/reset-password/${resetPasswordToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}\nIf you didn't forget your password, please ignore this email!`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message,
        })

        res.status(200).json({
            message: 'Email sent!',
        })
    } catch (err) {
        await userRepo.update(user.id, {
            resetPasswordToken: null,
            resetPasswordExpire: null,
        })

        return res.status(500).json({
            message: 'There was an error sending the email. Try again later!',
        })
    }
}
