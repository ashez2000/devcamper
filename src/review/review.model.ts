import { Schema, model, Types } from 'mongoose'

interface IReview {
  title: string
  text: string
  rating: number
  createdAt: Date
  bootcamp: Types.ObjectId
  user: Types.ObjectId
}

const ReviewSchema = new Schema<IReview>({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add some text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: Schema.Types.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Review = model<IReview>('Review', ReviewSchema)

export default Review
