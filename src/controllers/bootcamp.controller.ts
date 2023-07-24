import { Request, Response } from 'express'
import Bootcamp from '$/models/bootcamp.model'

export async function getBootcamps(req: Request, res: Response) {
  const bootcamps = await Bootcamp.find()
  res.status(200).json({ data: bootcamps })
}
