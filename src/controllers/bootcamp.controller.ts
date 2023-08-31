import { Request, Response } from 'express'
import { Bootcamp, createBootcamp as newBootamp } from '@/models/bootcamp.model'
import { AppError } from '$/utils/app-error.util'
import { getQuery } from '$/utils/query.util'
import { getAuthUser } from '$/auth'

// Get all bootcamps
export async function getBootcamps(req: Request, res: Response) {
  const query = getQuery(req.query)

  const bootcamps = await Bootcamp.find(query.filter)
    .select(query.select)
    .sort(query.sortBy)
    .skip(query.paginate.skip)
    .limit(query.paginate.limit)

  res.status(200).json({ data: bootcamps })
}

// Get bootcamp by id
export async function getBootcamp(req: Request, res: Response) {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) throw new AppError('Bootcamp not found', 404)

  res.status(200).json({ data: bootcamp })
}

// Create new bootcamp
export async function createBootcamp(req: Request, res: Response) {
  let auth = getAuthUser(req, ['publisher', 'admin'])
  if (!auth) throw new AppError('Unauthorized', 401)

  let bootcamp = await newBootamp({ ...req.body, user: auth.id })
  return res.status(201).json({ data: bootcamp })
}

// Update bootcamp by id
export async function updateBootcamp(req: Request, res: Response) {
  res.status(500).json({ data: 'Not implemented' })
}

// Delete bootcamp by id
export async function deleteBootcamp(req: Request, res: Response) {
  let auth = getAuthUser(req, ['publisher', 'admin'])
  if (!auth) throw new AppError('Unauthorized', 401)

  let bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) throw new AppError('Bootcamp not found', 404)

  if (bootcamp.user.toString() !== auth.id && auth.role !== 'admin') {
    throw new AppError('Unauthorized', 401)
  }

  await Bootcamp.findByIdAndDelete(req.params.id)
  return res.status(204).json({ data: null })
}
