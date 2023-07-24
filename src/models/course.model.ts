import { Schema, model } from 'mongoose'

const CourseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  tuition: {
    type: Number,
    required: [true, 'Tuition cost is required'],
  },
})

const Course = model('Course', CourseSchema)

export default Course
