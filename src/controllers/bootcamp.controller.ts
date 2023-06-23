import { Request, Response } from 'express'

import { createBootcampSchema } from '$/db/schema/bootcamp.schema'
import * as bootcampRepo from '$/db/repo/bootcamp.repo'
import { getCurrentUser } from '$/helpers/auth.helpers'
import { AppError } from '$/utils/app-error.util'

export async function findAll(req: Request, res: Response) {
  const bootcamps = await bootcampRepo.findAll({
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
  })

  res.status(200).json(bootcamps)
}

export async function findById(req: Request, res: Response) {
  const { id } = req.params

  const bootcamp = await bootcampRepo.findById(id)
  if (!bootcamp) {
    throw new AppError('Bootcamp not found', 404)
  }

  res.status(200).json(bootcamp)
}

export async function create(req: Request, res: Response) {
  const currentUser = getCurrentUser(req)

  const parsedResult = createBootcampSchema.safeParse(req.body)
  if (!parsedResult.success) {
    return res.status(400).json({ message: parsedResult.error })
  }

  const exist = await bootcampRepo.findByName(parsedResult.data.name)
  if (exist) {
    return res.status(400).json({
      message: `Bootcamp ${parsedResult.data.name} already exist`,
    })
  }

  const bootcamp = await bootcampRepo.create({
    ...parsedResult.data,
    userId: currentUser.id,
  })

  res.status(200).json(bootcamp)
}

export async function update(req: Request, res: Response) {
  const { id } = req.params
  const data = req.body
  const currentUser = getCurrentUser(req)

  const bootcamp = await bootcampRepo.findById(id)
  if (!bootcamp) {
    throw new AppError('Bootcamp not found', 404)
  }

  if (bootcamp.userId !== currentUser.id && currentUser.role !== 'admin') {
    throw new AppError('Not authorized', 403)
  }

  const updatedBootcamp = await bootcampRepo.update(id, data)

  res.status(200).json(updatedBootcamp)
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params
  const currentUser = getCurrentUser(req)

  const bootcamp = await bootcampRepo.findById(id)
  if (!bootcamp) {
    throw new AppError('Bootcamp not found', 404)
  }

  if (bootcamp.userId !== currentUser.id && currentUser.role !== 'admin') {
    throw new AppError('Not authorized', 403)
  }

  const deletedBootcamp = await bootcampRepo.remove(id)
  res.status(200).json(deletedBootcamp)
}
