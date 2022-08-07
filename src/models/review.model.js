const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  bootcamp: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
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
