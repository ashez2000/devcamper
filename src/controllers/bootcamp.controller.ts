import { Request, Response } from 'express'

import { createBootcampSchema } from '../db/schema/bootcamp.schema'
import * as bootcampRepo from '../db/repo/bootcamp.repo'

export async function findAll(req: Request, res: Response) {
    const bootcamps = await bootcampRepo.findAll({
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
    })

    res.status(200).json(bootcamps)
}

export async function findById(req: Request, res: Response) {
    const { id } = req.params
    const bootcamp = await bootcampRepo.findById(id)
    res.status(200).json(bootcamp)
}

export async function create(req: Request, res: Response) {
    const parsedResult = createBootcampSchema.safeParse(req.body)
    if (!parsedResult.success) {
        return res.status(400).json({ message: parsedResult.error })
    }

    const exist = await bootcampRepo.findByName(parsedResult.data.name)
    if (exist) {
        return res
            .status(400)
            .json({
                message: `Bootcamp ${parsedResult.data.name} already exist`,
            })
    }

    const bootcamp = await bootcampRepo.create({
        ...parsedResult.data,
        userId: req.user?.id,
    })

    res.status(200).json(bootcamp)
}

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    const bootcamp = await bootcampRepo.findById(id)
    if (!bootcamp) {
        return res.status(404).json({ message: 'Bootcamp not found' })
    }

    if (bootcamp.userId !== req.user?.id && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' })
    }

    const updatedBootcamp = await bootcampRepo.update(id, data)
    res.status(200).json(updatedBootcamp)
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params

    const bootcamp = await bootcampRepo.findById(id)
    if (!bootcamp) {
        return res.status(404).json({ message: 'Bootcamp not found' })
    }

    if (bootcamp.userId !== req.user?.id && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' })
    }

    const deletedBootcamp = await bootcampRepo.remove(id)
    res.status(200).json(deletedBootcamp)
}
