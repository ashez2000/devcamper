const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  tuition: String,
  bootcamp: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
})

// static average cost method
CourseSchema.statics.getAvgCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ])

  // update the bootcamp
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    })
  } catch (err) {
    console.error(err)
  }
}

CourseSchema.post('save', function () {
  this.constructor.getAvgCost(this.bootcamp)
})

CourseSchema.pre('remove', function () {
  this.constructor.getAvgCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema)
