const mongoose = require('mongoose')
const slugify = require('slugify')

const BootcampSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  user: mongoose.Schema.Types.ObjectId,
})

BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

module.exports = mongoose.model('Bootcamp', BootcampSchema)
