export const extractPagination = (query: any) => {
  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 10

  return { page, limit }
}
