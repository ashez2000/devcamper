import { Request, Response } from 'express'

import { bootcampCreateSchema } from '@/schemas/bootcamp'
import { getAuthPayload } from '@/helpers/auth'
import * as bootcampSrv from '@/services/bootcamps'

// path: GET /api/{ver}/bootcamps | public
export async function getBootcamps(req: Request, res: Response) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const bootcamps = await bootcampSrv.findBootcamps(page, limit)
  res.status(200).json({ bootcamps })
}

// path: GET /api/{ver}/bootcamps/{id} | public
export async function getBootcamp(req: Request, res: Response) {
  const bootcamp = await bootcampSrv.findBootcampById(req.params.id)
  res.status(200).json({ bootcamp })
}

// path: POST /api/{ver}/bootcamps | private(publisher, admin)
export async function createBootcamp(req: Request, res: Response) {
  const auth = getAuthPayload(req, ['PUBLISHER', 'ADMIN'])
  const data = bootcampCreateSchema.parse(req.body)
  const bootcamp = await bootcampSrv.createBootcamp(data, auth)
  res.status(201).json({ bootcamp })
}

// path: PUT /api/{ver}/bootcamps/{id} | private(publisher, admin)
export async function updateBootcamp(req: Request, res: Response) {
  const auth = getAuthPayload(req, ['PUBLISHER', 'ADMIN'])
  const data = bootcampCreateSchema.partial().parse(req.body)
  const bootcamp = await bootcampSrv.updateBootcamp(req.params.id, data, auth)
  res.status(200).json({ bootcamp })
}

// path: DELETE /api/{ver}/bootcamps/{id} | private(publisher, admin)
export async function deleteBootcamp(req: Request, res: Response) {
  const auth = getAuthPayload(req, ['PUBLISHER', 'ADMIN'])
  const bootcamp = await bootcampSrv.deleteBootcamp(req.params.id, auth)
  res.status(200).json({ bootcamp })
}
