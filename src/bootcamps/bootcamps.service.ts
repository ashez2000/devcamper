import Bootcamp from '../models/bootcamp.model'
import ErrorResponse from '../utils/app-error'
import type { CreateBootcampData } from './bootcamps.validator'

class BootcampNotFound extends ErrorResponse {
  constructor(id: string) {
    super(`Bootcamp with id ${id} not found`, 404)
  }
}

export const findBootcamps = async () => {
  const bootcamps = await Bootcamp.find()
  return bootcamps
}

export const findBootcampById = async (id: string) => {
  const bootcamp = await Bootcamp.findById(id)
  if (!bootcamp) throw new BootcampNotFound(id)
  return bootcamp
}

export const createBootcamp = async (data: CreateBootcampData) => {
  const bootcamp = await Bootcamp.create(data)
  return bootcamp
}

export const updateBootcamp = async (
  id: string,
  data: Partial<CreateBootcampData>
) => {
  const opt = { new: true, runValidators: true }
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, data, opt)
  if (!bootcamp) throw new BootcampNotFound(id)

  return bootcamp
}
