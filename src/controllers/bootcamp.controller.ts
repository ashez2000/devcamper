import { Request, Response } from 'express'
import Bootcamp from '$/models/bootcamp.model'
import { AppError } from '$/utils/app-error.util'
import { getQuery } from '$/utils/query.util'

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
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ data: bootcamp })
}

// Update bootcamp by id
export async function updateBootcamp(req: Request, res: Response) {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id)
  if (!bootcamp) throw new AppError('Bootcamp not found', 404)

  res.status(200).json({ data: bootcamp })
}

// Delete bootcamp by id
export async function deleteBootcamp(req: Request, res: Response) {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
  if (!bootcamp) throw new AppError('Bootcamp not found', 404)

  res.status(204).json({ data: null })
}
