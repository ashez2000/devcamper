import { Schema, model } from 'mongoose'
import { geocoder } from '@/utils/geocoder'
import { Bootcamp } from '@/schemas/bootcamp.schema'

let bootcampSchema = new Schema<Bootcamp>(
  {
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
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      type: [String],
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
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
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

async function getLocation(addr: string) {
  let [loc] = await geocoder.geocode(addr)

  return {
    type: 'Point',
    coordinates: [loc.longitude, loc.latitude],
    formattedAddress: loc.formattedAddress,
    street: loc.streetName,
    city: loc.city,
    state: loc.stateCode,
    zipcode: loc.zipcode,
    country: loc.countryCode,
  }
}

export const BootcampModel = model('Bootcamp', bootcampSchema)

// TODO: types
export async function createBootcamp(bootcamp: any) {
  let location = await getLocation(bootcamp.address)
  return BootcampModel.create({
    ...bootcamp,
    location,
  })
}
