const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load env vars
dotenv.config()

// Load models
const Bootcamp = require('../models/bootcamp.model')
const Course = require('../models/course.model')
const User = require('../models/user.model')
const Review = require('../models/review.model')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`courses.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`users.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`reviews.json`, 'utf-8'))

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    await User.create(users)
    await Review.create(reviews)
    console.log('Data Imported')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()
    console.log('Data Destroyed')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
