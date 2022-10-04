import { Schema, model, Types } from 'mongoose'
import slugify from 'slugify'

export interface IBootcamp {
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
    required: [true, 'Please provide a name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  averageCost: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
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

const Bootcamp = model('Bootcamp', BootcampSchema)

export default Bootcamp
