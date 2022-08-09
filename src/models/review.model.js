const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  bootcamp: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('Review', ReviewSchema)
