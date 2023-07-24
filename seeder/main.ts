import mongoose from 'mongoose'
import config from '../src/config'
import User from '../src/models/user.model'
import Bootcamp from '../src/models/bootcamp.model'
import Course from '../src/models/course.model'
import Review from '../src/models/review.model'

mongoose.connect(config.mongoUri)

async function deleteData() {
  await User.deleteMany({})
  await Bootcamp.deleteMany({})
  await Course.deleteMany({})
  await Review.deleteMany({})
  console.log('Data Destroyed')
}

async function main() {
  const cmd = process.argv[2]

  if (cmd === '-d') {
    await deleteData()
  }
}

main()
  .catch(console.error)
  .finally(() => mongoose.disconnect())
