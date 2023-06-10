import { Request, Response } from 'express'
import * as bootcampRepo from '../../../db/repo/bootcamp.repo'

export async function findAll(req: Request, res: Response) {
    const bootcamps = await bootcampRepo.findAll()
    res.status(200).json(bootcamps)
}

export async function findById(req: Request, res: Response) {
    const { id } = req.params
    const bootcamp = await bootcampRepo.findById(id)
    res.status(200).json(bootcamp)
}

export async function create(req: Request, res: Response) {
    const data = req.body
    const bootcamp = await bootcampRepo.create(data)
    res.status(200).json(bootcamp)
}

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    const bootcamp = await bootcampRepo.update(id, data)
    res.status(200).json(bootcamp)
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params
    const bootcamp = await bootcampRepo.remove(id)
    res.status(200).json(bootcamp)
}
