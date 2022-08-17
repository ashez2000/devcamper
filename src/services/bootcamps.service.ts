import Bootcamp from '../models/bootcamp.model'
import ErrorResponse from '../utils/error.util'
import type { BootcampInputData } from '../schemas/bootcamp.schema'

class BootcampNotFound extends ErrorResponse {
  constructor(id: string) {
    super(`Bootcamp with id ${id} not found`, 404)
  }
}

/**
 * Get all bootcamps
 */
export const findBootcamps = async () => {
  const bootcamps = await Bootcamp.find()
  return bootcamps
}

/**
 * Get bootcamp by id
 */
export const findBootcampById = async (id: string) => {
  const bootcamp = await Bootcamp.findById(id)
  if (!bootcamp) throw new BootcampNotFound(id)
  return bootcamp
}

/**
 * Create new bootcamp
 */
export const createBootcamp = async (data: BootcampInputData) => {
  const bootcamp = await Bootcamp.create(data)
  return bootcamp
}

/**
 * Update bootcamp
 */
export const updateBootcamp = async (id: string, data: any) => {
  const opt = { new: true, runValidators: true }
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, data, opt)
  if (!bootcamp) throw new BootcampNotFound(id)

  return bootcamp
}
