const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  tuition: String,
  bootcamp: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('Course', CourseSchema)
