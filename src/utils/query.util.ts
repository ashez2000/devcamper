export function select(query: any) {
  return query.select ? query.select.split(',').join(' ') : ''
}

export function filter(_query: any) {
  const query = { ..._query }
  const fieldsToRemove = ['select', 'sort', 'page', 'limit']
  fieldsToRemove.forEach(param => delete query[param])

  let queryStr = JSON.stringify(query).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`
  )

  return JSON.parse(queryStr)
}

export function paginate(query: any) {
  const page = parseInt(query.page || '1')
  const limit = parseInt(query.limit || '10')

  return {
    skip: (page - 1) * limit,
    limit,
  }
}

export function sortBy(query: any) {
  return query.sort ? query.sort.split(',').join(' ') : '-createdAt'
}

export function getQuery(query: any) {
  return {
    select: select(query),
    filter: filter(query),
    paginate: paginate(query),
    sortBy: sortBy(query),
  }
}
