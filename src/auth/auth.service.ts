import User from '../user/user.model'
import AppError from '../utils/app-error'
import { verifyPassword } from './auth.utils'

export const getUserByCredentials = async (data: any) => {
  const user = await User.findOne({ email: data.email })
  if (!user) throw new AppError('Invalid credentials', 401)

  const isMatch = await verifyPassword(data.password, user.password)
  if (!isMatch) throw new AppError('Invalid credentials', 401)

  return user
}
