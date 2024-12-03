export interface CreateCourseDto {
  title: string
  description: string
  tuition: number
  minimumSkill: 'beginner' | 'intermediate' | 'advanced'
  scholarshipAvailable: boolean
  bootcamp: string
  user: string
}
