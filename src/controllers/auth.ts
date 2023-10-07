import { Request, Response } from 'express'
import * as userSrv from '@/services/users'

// path: POST /api/{ver}/auth/signup | public
export async function signup(req: Request, res: Response) {
  const data = await userSrv.createUser(req.body)
  res.cookie('token', data.token).status(201).json(data)
}
