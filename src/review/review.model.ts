import { Schema, model, Types, Model } from 'mongoose'
import { updateBootcampById } from '../bootcamp/bootcamp.service'

interface IReview {
  content: string
  rating: number
  bootcamp: Types.ObjectId
  user: Types.ObjectId
}

interface IReviewModel extends Model<IReview> {
  getAverageRating: (bootcampId: string) => Promise<void>
}

const ReviewSchema = new Schema<IReview, IReviewModel>({
  content: {
    type: String,
    required: [true, 'Please provide some content'],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
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

// Prevent user from submitting more than one review per bootcamp
// ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true })

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ])

  await updateBootcampById(bootcampId, {
    averageRating: obj[0].averageRating,
  })
}

// Call getAverageRating after save
ReviewSchema.post('save', function () {
  Review.getAverageRating(this.bootcamp.toString())
})

// Call getAverageRating before remove
ReviewSchema.pre('remove', function () {
  Review.getAverageRating(this.bootcamp.toString())
})

const Review = model<IReview, IReviewModel>('Review', ReviewSchema)

export default Review
