import { Request, Response } from 'express'
import { AppError } from '$/utils/app-error.util'
import Course from '$/models/course.model'

// Get all courses
export async function getCourses(req: Request, res: Response) {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId })
    return res.status(200).json({ data: courses })
  }

  const courses = await Course.find()
  res.status(200).json({ data: courses })
}

// Get course by id
export async function getCourse(req: Request, res: Response) {
  const course = await Course.findById(req.params.id)
  if (!course) throw new AppError('Course not found', 404)

  res.status(200).json({ data: course })
}

// Create new course
export async function createCourse(req: Request, res: Response) {
  req.body.bootcamp = req.params.bootcampId
  const course = await Course.create(req.body)
  res.status(201).json({ data: course })
}

// Update course by id
export async function updateCourse(req: Request, res: Response) {
  const course = await Course.findByIdAndUpdate(req.params.id)
  if (!course) throw new AppError('Course not found', 404)

  res.status(200).json({ data: course })
}

// Delete course by id
export async function deleteCourse(req: Request, res: Response) {
  const course = await Course.findByIdAndDelete(req.params.id)
  if (!course) throw new AppError('Course not found', 404)

  res.status(200).json({ data: course })
}
