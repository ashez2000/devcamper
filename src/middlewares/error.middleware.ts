import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app-error.util'

export async function globalError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log('error:', err.message)

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    res.status(500).json({ message: err.message })
}

export function notFound(req: Request, res: Response) {
    res.status(404).json({
        message: `Not found: ${req.method} ${req.originalUrl}`,
    })
}
