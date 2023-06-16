import { db } from '../conn'

export async function findAll({ page = 1, limit = 10 }) {
    const courses = await db.course.findMany({
        skip: (page - 1) * limit,
        take: limit,
    })

    return courses
}

export async function findById(id: string) {
    const course = await db.course.findUnique({
        where: { id },
    })

    return course
}

export async function create(data: any) {
    const course = await db.course.create({
        data,
    })

    return course
}

export async function update(id: string, data: any) {
    const course = await db.course.update({
        where: { id },
        data,
    })

    return course
}

export async function remove(id: string) {
    const course = await db.course.delete({
        where: { id },
    })

    return course
}
