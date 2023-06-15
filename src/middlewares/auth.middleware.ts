import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { UserRoles } from '../db/schema/user.schema'
import { AuthPayload } from '../utils/jwt.util'

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

export function protect(req: Request, res: Response, next: NextFunction) {
    const token =
        req.headers.authorization?.split(' ')[1] ||
        (req.cookies.token as string)

    if (!token) {
        console.error('auth: token not found')
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload
        req.user = payload
        next()
    } catch (err) {
        console.error('auth: token not valid')
        return res.status(401).json({ message: 'Not authorized' })
    }
}

export function authorize(...roles: UserRoles[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized' })
        }

        next()
    }
}
