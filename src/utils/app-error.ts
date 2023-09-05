export type HttpErrStatus = 400 | 401 | 403 | 404 | 500

export class AppError extends Error {
  constructor(message: string, public statusCode: HttpErrStatus) {
    super(message)
    this.statusCode = statusCode
  }
}
