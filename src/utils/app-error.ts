export type HttpErrStatus = 400 | 401 | 403 | 404 | 500

class AppError extends Error {
  constructor(message: string, public statusCode: HttpErrStatus) {
    super(message)
    this.statusCode = statusCode
  }
}

export function notfound(msg: string = 'Not found') {
  return new AppError(msg, 404)
}

export function unauthorized(msg: string = 'Unauthorized') {
  return new AppError(msg, 401)
}

export function forbidden(msg: string = 'Forbidden') {
  return new AppError(msg, 403)
}

export function internalservererror(msg: string = 'Internal Server Error') {
  return new AppError(msg, 500)
}
