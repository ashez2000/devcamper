import { Schema, model, Types, Model } from 'mongoose'
import Bootcamp from './bootcamp.model'

interface ICourse {
  title: string
  description: string
  tuition: number
  bootcamp?: Types.ObjectId
  user?: Types.ObjectId
}

interface ICourseModel extends Model<ICourse> {
  getAverageCost: (bootcampId: string) => Promise<void>
}

const CourseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  tuition: {
    type: Number,
    required: true,
  },
  bootcamp: {
    type: Types.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
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

  try {
    await Bootcamp.findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    })
  } catch (err) {
    console.error(err)
  }
}

// Call getAverageCost after save
CourseSchema.post('save', function () {
  Course.getAverageCost(this.bootcamp?.toString() || '')
})

// Call getAverageCost before remove
CourseSchema.pre('remove', function () {
  Course.getAverageCost(this.bootcamp?.toString() || '')
})

const Course = model<ICourse, ICourseModel>('Course', CourseSchema)

export default Course
