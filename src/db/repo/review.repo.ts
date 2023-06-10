import { db } from '../conn'

export async function findAllByBoocampId(bootcampId: string) {
    return db.review.findMany({
        where: { bootcampId },
        include: { user: true },
    })
}

export async function create(data: any) {
    const review = await db.review.create({ data })
    return review
}

export async function update(id: string, data: any) {
    const review = await db.review.update({ where: { id }, data })
    return review
}

export async function remove(id: string) {
    const review = await db.review.delete({ where: { id } })
    return review
}
