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
  slug: String,
  image: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

module.exports = mongoose.model('Bootcamp', BootcampSchema)
