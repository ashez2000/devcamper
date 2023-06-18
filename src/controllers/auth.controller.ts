import crypto from 'crypto'
import argon from 'argon2'
import { Request, Response } from 'express'

import { sendEmail } from '../services/email.service'
import { generateToken } from '../utils/jwt.util'
import * as userRepo from '../db/repo/user.repo'
import { SignUpInput, SignInInput, UserRoles } from '../db/schema/user.schema'

/**
 * @desc    Sign up user
 * @route   POST /api/{ver}/auth/sign-up
 */
export async function signUp(
    req: Request<unknown, unknown, SignUpInput>,
    res: Response
) {
    const exist = await userRepo.findByEmail(req.body.email)
    if (exist) {
        return res.status(400).json({ message: 'Email already exist' })
    }

    const user = await userRepo.create(req.body)

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role as UserRoles,
    })

    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token })
}

/**
 * @desc    Sign in user
 * @route   POST /api/{ver}/auth/sign-in
 */
export async function signIn(
    req: Request<unknown, unknown, SignInInput, unknown>,
    res: Response
) {
    const { email, password } = req.body

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

/**
 * @desc    Forgot password
 * @route   POST /api/{ver}/auth/forgot-password
 */
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

    const message = `Reset password token: ${resetPasswordToken}`

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

/**
 * @desc    Reset password
 * @route   PUT /api/{ver}/auth/reset-password
 */
export async function resetPassword(req: Request, res: Response) {
    const { resetToken, email, password } = req.body

    const user = await userRepo.findByEmail(email)
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' })
    }

    if (!user.resetPasswordToken || !user.resetPasswordExpire) {
        return res.status(400).json({ message: 'Invalid reset token' })
    }

    const isMatch = await argon.verify(user.resetPasswordToken, resetToken)
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid reset token' })
    }

    if (user.resetPasswordExpire < new Date()) {
        return res.status(400).json({ message: 'Reset token has expired' })
    }

    const hashedPassword = await argon.hash(password)

    await userRepo.update(user.id, {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpire: null,
    })

    res.status(200).json({ message: 'Password updated successfully' })
}
