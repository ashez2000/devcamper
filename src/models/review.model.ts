import { Schema, model } from 'mongoose'

const ReviewSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Rating is required'],
  },
  bootcamp: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Bootcamp',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

const Review = model('Review', ReviewSchema)

export default Review
