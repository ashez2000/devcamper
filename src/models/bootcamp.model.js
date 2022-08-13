const mongoose = require('mongoose')
const slugify = require('slugify')

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  averageCost: {
    type: Number,
    required: true,
    default: 0,
  },
  averageRating: {
    type: Number,
    required: true,
    default: 0,
  },
  slug: String,
  photo: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Create slug from name
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// Cascade delete courses and revires when a bootcamp is deleted
BootcampSchema.pre('remove', async function (next) {
  await this.model('Course').deleteMany({ bootcamp: this._id })
  await this.model('Review').deleteMany({ bootcamp: this._id })
  next()
})

module.exports = mongoose.model('Bootcamp', BootcampSchema)
