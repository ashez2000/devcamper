import { Schema, model, Model, Types } from 'mongoose'
import { updateBootcampById } from '../bootcamp/bootcamp.service'

export interface ICourse {
  title: string
  description: string
  tuition: number
  bootcamp: Types.ObjectId
  user: Types.ObjectId
}

interface ICourseModel extends Model<ICourse> {
  getAverageCost(bootcampIdd: string): Promise<void>
}

// User Schema
const CourseSchema = new Schema<ICourse, ICourseModel>({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please provide a course tuition amount'],
  },
  bootcamp: {
    type: Schema.Types.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId: string) {
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

  await updateBootcampById(bootcampId, {
    averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
  })
}

const Course = model<ICourse, ICourseModel>('Course', CourseSchema)

// Call getAverageCost after save
CourseSchema.post('save', function () {
  Course.getAverageCost(this.bootcamp.toString())
})

// Call getAverageCost before remove
CourseSchema.pre('remove', function () {
  Course.getAverageCost(this.bootcamp.toString())
})

export default Course
