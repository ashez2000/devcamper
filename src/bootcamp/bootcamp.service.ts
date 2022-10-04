import Bootcamp from './bootcamp.model'
import AppError from '../utils/app-error'

import { CreateBootcampDto } from './bootcamp.dto'

export const findAllBootcamp = async () => {
  const bootcamps = await Bootcamp.find()
  return bootcamps
}

export const findBootcampById = async (id: string) => {
  const bootcamp = await Bootcamp.findById(id)
  if (!bootcamp) throw new AppError(`Bootcamp not found with id of ${id}`, 404)
  return bootcamp
}

export const createBootcamp = async (data: CreateBootcampDto) => {
  const bootcamp = await Bootcamp.create(data)
  return bootcamp
}

export const updateBootcampById = async (id: string, data: any) => {
  const opt = { new: true, runValidators: true }
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, data, opt)

  if (!bootcamp) throw new AppError(`Bootcamp not found with id of ${id}`, 404)

  return bootcamp
}
