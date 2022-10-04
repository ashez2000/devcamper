import { Schema, model, Types } from 'mongoose'
import slugify from 'slugify'

import Course from './course.model'
import Review from './review.model'

interface IBootcamp {
  name: string
  description: string
  slug?: string
  photo?: string
  averageCost: number
  averageRating: number
  user?: Types.ObjectId
}

const BootcampSchema = new Schema<IBootcamp>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  averageCost: {
    type: Number,
    required: true,
    default: 0,
  },
  averageRating: {
    type: Number,
    required: true,
    default: 0,
  },
  slug: String,
  photo: String,
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Create slug from name
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// Cascade delete courses and revires when a bootcamp is deleted
BootcampSchema.pre('remove', async function (next) {
  await Course.deleteMany({ bootcamp: this._id })
  await Review.deleteMany({ bootcamp: this._id })
  next()
})

const Bootcamp = model('Bootcamp', BootcampSchema)

export default Bootcamp
