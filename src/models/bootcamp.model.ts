import { Schema, model } from 'mongoose'
import geocoder from '$/libs/geocoder'

const BootcampSchema = new Schema({
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
})

BootcampSchema.pre('save', async function (next) {
  if (!this.isModified(this.address)) return next()

  const address = this.address!
  const [loc] = await geocoder.geocode(address)

  this.location = {
    type: 'Point',
    /* @ts-ignore */
    coordinates: [loc.longitude, loc.latitude],
    formattedAddress: loc.formattedAddress,
    street: loc.streetName,
    city: loc.city,
    state: loc.stateCode,
    zipcode: loc.zipcode,
    country: loc.countryCode,
  }

  this.address = undefined
  next()
})

const Bootcamp = model('Bootcamp', BootcampSchema)

export default Bootcamp
