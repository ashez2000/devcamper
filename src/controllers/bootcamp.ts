import { RequestHandler } from 'express'

import { AppError } from '@/utils/app-error'
import { getAuthPayload } from '@/helpers/auth'
import { bootcampSchema } from '@/schemas/bootcamp'
import * as bootcamp_repo from '@/repository/bootcamp'

/**
 * Find all bootcamps
 * @path GET /bootcamps | Public
 */
export const findMany: RequestHandler = async (req, res) => {
  const bootcamps = await bootcamp_repo.findMany()
  res.status(200).json(bootcamps)
}

/**
 * Find all bootcamps
 * @path GET /bootcamps/{id} | Public
 */
export const findById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const bootcamp = await bootcamp_repo.findById(id)
  res.status(200).json(bootcamp)
}

/**
 * Create new bootcamp
 * @path POST /bootcamps | Private
 */
export const create: RequestHandler = async (req, res) => {
  const body = bootcampSchema.parse(req.body)
  const auth = getAuthPayload(res)
  const bootcamp = await bootcamp_repo.create(body, auth.id)
  res.status(201).json(bootcamp)
}

/**
 * Update bootcamp
 * @path POST /bootcamps/{id} | Private
 */
export const update: RequestHandler = async (req, res) => {
  const id = req.params.id
  const bootcamp = await bootcamp_repo.findById(id)
  if (!bootcamp) {
    throw new AppError('Bootcamp not found', 404)
  }

  const auth = getAuthPayload(res)
  if (bootcamp.publisherId !== auth.id && auth.role !== 'ADMIN') {
    throw new AppError('Forbidden', 403)
  }

  const body = bootcampSchema.partial().parse(req.body)
  const new_bootcamp = await bootcamp_repo.update(id, body)
  res.status(201).json(new_bootcamp)
}

/**
 * Remove bootcamp
 * @path POST /bootcamps/{id} | Private
 */
export const remove: RequestHandler = async (req, res) => {
  const id = req.params.id
  const bootcamp = await bootcamp_repo.findById(id)
  if (!bootcamp) {
    throw new AppError('Bootcamp not found', 404)
  }

  const auth = getAuthPayload(res)
  if (bootcamp.publisherId !== auth.id && auth.role !== 'ADMIN') {
    throw new AppError('Forbidden', 403)
  }

  await bootcamp_repo.remove(id)
  res.status(201).json({})
}
