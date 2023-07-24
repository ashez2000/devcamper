import { Schema, model } from 'mongoose'

const BootcampSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
})

const Bootcamp = model('Bootcamp', BootcampSchema)

export default Bootcamp
