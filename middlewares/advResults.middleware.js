const advRes = (model, populate) => async (req, res, next) => {
    let query = { ...req.query }

    const fieldsToExclude = ['select', 'sort', 'page', 'limit']
    fieldsToExclude.forEach(param => delete query[param])

    let q = model.find(query)

    // select query
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        q = q.select(fields)
    }

    // sort query
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        q = q.sort(sortBy)
    } else {
        q = q.sort('-createdAt')
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.page, 10) || 20
    const s = (page - 1) * limit
    const e = page * limit
    const total = await model.countDocuments()
    q = q.skip(s).limit(limit)

    if(populate) {
        q = q.populate(populate)
    }

    // executing query
    const results = await q

    // pagination res
    let pagination = {}

    if (e < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (s > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    req.advResults = {
        success: true,
        count: results.length,
        data: results
    } 

    next()
}

module.exports = advRes
