import Bootcamp from './bootcamp.model'
import AppError from '../utils/app-error'

import { CreateBootcampDto } from './bootcamp.dto'
import { Query, filter, sort, select, paginate } from '../utils/query-builder'

export async function findBootcamps(query: Query) {
  const filterQuery = filter(query)
  const sortFields = sort(query)
  const selectFields = select(query)
  const { limit, skip } = paginate(query)

  const bootcamps = await Bootcamp.find(filterQuery)
    .select(selectFields)
    .sort(sortFields)
    .skip(skip)
    .limit(limit)

  return bootcamps
}

export async function findBootcamp(id: string) {
  const bootcamp = await Bootcamp.findById(id)
  if (!bootcamp) {
    throw new AppError(`bootcamp (${id}) not found`, 404)
  }
  return bootcamp
}

export async function createBootcamp(data: CreateBootcampDto) {
  const bootcamp = await Bootcamp.create(data)
  return bootcamp
}

export async function updateBootcamp(id: string, data: CreateBootcampDto) {
  const opt = { new: true, runValidators: true }
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, data, opt)
  if (!bootcamp) {
    throw new AppError(`bootcamp (${id}) not found`, 404)
  }
  return bootcamp
}

export async function deleteBootcamp(id: string) {
  const bootcamp = await Bootcamp.findByIdAndDelete(id)
  if (!bootcamp) {
    throw new AppError(`bootcamp (${id}) not found`, 404)
  }
  return bootcamp
}
