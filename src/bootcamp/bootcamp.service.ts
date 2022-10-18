import Bootcamp from './bootcamp.model'
import AppError from '../utils/app-error'
import geocoder from '../utils/geocoder'

import { CreateBootcampDto } from './bootcamp.dto'
import { Query, filter, sort, select, paginate } from '../utils/query-builder'

export const findAllBootcamp = async (query: Query) => {
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

export const findBootcampWithinRadius = async (
  zipcode: string,
  distance: number
) => {
  const loc = await geocoder.geocode(zipcode)

  const lat = loc[0].latitude
  const lng = loc[0].longitude

  const radius = distance / 3963 // radius of earth in miles

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  })

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

export const deleteBootcampById = async (id: string) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(id)

  if (!bootcamp) throw new AppError(`Bootcamp not found with id of ${id}`, 404)

  return bootcamp
}
