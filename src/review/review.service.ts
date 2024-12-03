import AppError from '../utils/app-error'
import { Query, filter, sort, select, paginate } from '../utils/query-builder'
import { CreateReviewDto } from './review.dto'
import Review from './review.model'

export async function findReviews(query: Query) {
  const filterQuery = filter(query)
  const sortFields = sort(query)
  const selectFields = select(query)
  const { limit, skip } = paginate(query)

  const reviews = await Review.find(filterQuery)
    .select(selectFields)
    .sort(sortFields)
    .skip(skip)
    .limit(limit)

  return reviews
}

export async function findReviewsForBootcamp(bootcampId: string, query: Query) {
  const filterQuery = filter(query)
  const sortFields = sort(query)
  const selectFields = select(query)
  const { limit, skip } = paginate(query)

  const reviews = await Review.find({ bootcamp: bootcampId, ...filterQuery })
    .select(selectFields)
    .sort(sortFields)
    .skip(skip)
    .limit(limit)

  return reviews
}

export async function findReview(id: string) {
  const review = await Review.findById(id)
  if (!review) {
    throw new AppError(`review (${id}) not found`, 404)
  }
  return review
}

export async function createReview(data: CreateReviewDto) {
  const review = await Review.create(data)
  return review
}

export async function updateReview(id: string, data: any) {
  const opt = { new: true, runValidators: true }
  const review = await Review.findByIdAndUpdate(id, data, opt)
  if (!review) {
    throw new AppError(`review (${id}) not found`, 404)
  }
  return review
}

export async function deleteReview(id: string) {
  const review = await Review.findByIdAndDelete(id)
  if (!review) {
    throw new AppError(`review (${id}) not found`, 404)
  }
  return review
}
