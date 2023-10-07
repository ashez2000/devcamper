export class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
  }
}

export function UnauthorizedError(message: string = 'Unauthorized') {
  return new AppError(message, 401)
}
