import { Types } from 'mongoose'

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
  slug: string
  description: string
  website: string
  phone: string
  email: string
  address: string
  location: Location
  careers: string[]
  averageRating: number
  averageCost: number
  photo: string
  housing: boolean
  jobAssistance: boolean
  jobGuarantee: boolean
  acceptGi: boolean
  createdAt: Date
  updatedAt: Date
  user: Types.ObjectId
}
