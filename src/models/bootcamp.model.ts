import { Schema, model, Types } from 'mongoose'
import { geocoder } from '@/utils/geocoder'

export type Location = {
  type: string
  coordinates: [number, number]
  formattedAddress: string
  street: string
  city: string
  state: string
  zipcode: string
  country: string
}

export type Bootcamp = {
  name: string
  description: string
  address: string
  location: Location
  user: Types.ObjectId
}

const bootcampSchema = new Schema<Bootcamp>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
    },

    address: {
      type: String,
      required: [true, 'Address is required'],
    },

    location: {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
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

export const Bootcamp = model('Bootcamp', bootcampSchema)

// TODO: types
export async function createBootcamp(bootcamp: any) {
  let location = await getLocation(bootcamp.address)
  return Bootcamp.create({
    ...bootcamp,
    location,
  })
}
