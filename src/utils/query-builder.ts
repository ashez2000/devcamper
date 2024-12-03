export type Query = { [key: string]: string }

export const filter = (query: Query): Query => {
  let q = { ...query }

  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach((el) => delete q[el])

  let str = JSON.stringify(q)
  str = str.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  return JSON.parse(str)
}

export const select = (query: Query) => {
  if (query.fields) {
    const fields = query.fields.split(',').join(' ')
    return fields
  }

  return '-__v'
}

export const sort = (query: Query) => {
  if (query.sort) {
    const sortBy = query.sort.split(',').join(' ')
    return sortBy
  }

  return '-createdAt'
}

export const paginate = (query: Query) => {
  const page = parseInt(query.page, 10) || 1
  const limit = parseInt(query.limit, 10) || 25
  const skip = (page - 1) * limit

  return { page, limit, skip }
}
