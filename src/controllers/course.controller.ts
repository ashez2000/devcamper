import { Request, Response } from 'express'

import { createCourseSchema } from '../db/schema/course.schema'
import * as courseRepo from '../db/repo/course.repo'

export async function findAll(req: Request, res: Response) {
    const courses = await courseRepo.findAll({
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
    })

    res.status(200).json(courses)
}

export async function findById(req: Request, res: Response) {
    const { id } = req.params
    const course = await courseRepo.findById(id)
    res.status(200).json(course)
}

export async function create(req: Request, res: Response) {
    const parsedResult = createCourseSchema.safeParse(req.body)
    if (!parsedResult.success) {
        return res.status(400).json({ message: parsedResult.error })
    }

    const course = await courseRepo.create({
        ...parsedResult.data,
        userId: req.user?.id,
    })

    res.status(200).json(course)
}

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    const course = await courseRepo.findById(id)
    if (!course) {
        return res.status(404).json({ message: 'Course not found' })
    }

    if (course.userId !== req.user?.id && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' })
    }

    const updatedCourse = await courseRepo.update(id, data)
    res.status(200).json(updatedCourse)
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params

    const course = await courseRepo.findById(id)
    if (!course) {
        return res.status(404).json({ message: 'Course not found' })
    }

    if (course.userId !== req.user?.id && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' })
    }

    await courseRepo.remove(id)
    res.status(200).json({ message: 'Course removed' })
}
