import { Request, Response } from 'express'

import { getCurrentUser } from '$/helpers/auth.helpers'
import { AppError } from '$/utils/app-error.util'

import {
  createBootcampSchema,
  updateBootcampSchema,
} from '$/schemas/bootcamp.schema'

import * as bootcampRepo from '$/db/repo/bootcamp.repo'

export async function findAll(req: Request, res: Response) {
  const bootcamps = await bootcampRepo.findAll(req.query)
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
  const data = createBootcampSchema.parse(req.body)

  const exist = await bootcampRepo.findByName(data.name)
  if (exist) {
    throw new AppError('Bootcamp already exists', 400)
  }

  const bootcamp = await bootcampRepo.create({
    ...data,
    userId: currentUser.id,
  })

  res.status(201).json(bootcamp)
}

export async function update(req: Request, res: Response) {
  const { id } = req.params
  const currentUser = getCurrentUser(req)
  const data = updateBootcampSchema.parse(req.body)

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
