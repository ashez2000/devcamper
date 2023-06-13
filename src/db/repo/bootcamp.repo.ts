import { db } from '../conn'

export async function findAll({ page = 1, limit = 10 }) {
    const bootcamps = await db.bootcamp.findMany({
        skip: (page - 1) * limit,
        take: limit,
    })

    return bootcamps
}

export async function findById(id: string) {
    const bootcamp = await db.bootcamp.findUnique({
        where: { id },
    })

    return bootcamp
}

export async function create(data: any) {
    const bootcamp = await db.bootcamp.create({
        data,
    })

    return bootcamp
}

export async function update(id: string, data: any) {
    const bootcamp = await db.bootcamp.update({
        where: { id },
        data,
    })

    return bootcamp
}

export async function remove(id: string) {
    const bootcamp = await db.bootcamp.delete({
        where: { id },
    })

    return bootcamp
}
