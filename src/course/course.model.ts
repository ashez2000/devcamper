import { Schema, model, Types } from 'mongoose'

export interface ICourse {
  title: string
  description: string
  weeks: string
  tuition: number
  minimumSkill: 'beginner' | 'intermediate' | 'advanced'
  scholarshipAvailable: boolean
  createdAt: Date
  bootcamp: Types.ObjectId
  user: Types.ObjectId
}

const CourseSchema = new Schema<ICourse>({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: Schema.Types.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Course = model<ICourse>('Course', CourseSchema)

export default Course
