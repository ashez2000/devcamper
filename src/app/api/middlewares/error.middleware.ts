import { Request, Response, NextFunction } from 'express'

export async function globalError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err.stack)
    res.status(500).json({ message: err.message })
}

export function notFound(req: Request, res: Response) {
    res.status(404).json({
        message: `Not found: ${req.method} ${req.originalUrl}`,
    })
}
