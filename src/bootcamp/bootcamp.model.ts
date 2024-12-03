import { Schema, model, Types } from 'mongoose'
import slugify from 'slugify'

export interface IBootcamp {
  name: string
  slug?: string
  description: string
  website?: string
  phone?: string
  email?: string
  address: string
  careers: string[]
  averageRating: number
  averageCost: number
  photo: string
  housing: boolean
  jobAssistance: boolean
  jobGuarantee: boolean
  acceptGi: boolean
  user: Types.ObjectId
  createdAt: Date
}

const BootcampSchema = new Schema<IBootcamp>({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10'],
  },
  averageCost: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Create slug from name
BootcampSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next()
    return
  }
  this.slug = slugify(this.name, { lower: true })
  next()
})

const Bootcamp = model('Bootcamp', BootcampSchema)

export default Bootcamp
