const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load env vars
dotenv.config()

// Load models
const User = require('../src/models/user.model')
const Bootcamp = require('../src/models/bootcamp.model')
const Course = require('../src/models/course.model')
const Review = require('../src/models/review.model')

// Connect to DB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected')
})

// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/bootcamps.json`, 'utf-8')
)
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/courses.json`, 'utf-8')
)
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await User.create(users)
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
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
