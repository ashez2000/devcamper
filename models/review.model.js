const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
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
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

// user can only add one review per bootcamp
ReviewSchema.index({ user: 1, bootcamp: 1 }, { unique: true })

// static average rating method
ReviewSchema.statics.getAvgRating = async function (bootcampId) {
  // aggregate logic
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

  // update the bootcamp
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating,
    })
  } catch (err) {
    console.error(err)
  }
}

ReviewSchema.post('save', function () {
  this.constructor.getAvgRating(this.bootcamp)
})

ReviewSchema.pre('remove', function () {
  this.constructor.getAvgRating(this.bootcamp)
})

module.exports = mongoose.model('Review', ReviewSchema)
