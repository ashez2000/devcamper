const fieldsToExclude = ['page', 'limit', 'sort', 'select']

export function select(query: any) {
  const select = (query.select as string) || null
  const fields = select
    ? select.split(',').reduce((acc: any, field: string) => {
        return Object.assign(acc, { [field]: true })
      }, {})
    : null

  return fields
}

export function paginate(qury: any) {
  const page = parseInt(qury.page || '1')
  const limit = parseInt(qury.limit || '10')

  return {
    skip: (page - 1) * limit,
    take: limit,
  }
}

export function orderBy(query: any) {
  const sort = (query.sort as string) || null
  const sortBy = sort ? sort.split(',') : ['-createdAt']

  return sortBy.map((field: string) => {
    const order = field.startsWith('-') ? 'desc' : 'asc'
    const name = field.replace(/^-/, '')
    return {
      [name]: order,
    }
  })
}
