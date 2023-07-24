import mongoose from 'mongoose'
import config from '../src/config'
import Bootcamp from '../src/models/bootcamp.model'

mongoose.connect(config.mongoUri)

async function deleteData() {
  await Bootcamp.deleteMany({})
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
