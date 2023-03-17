export function paginate(query: any, docCount: number) {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const res = {
    next: endIndex < docCount ? page + 1 : null,
    prev: startIndex > 0 ? page - 1 : null,
    total: Math.ceil(docCount / limit),
  };

  return { page, limit, startIndex, endIndex, res };
}
