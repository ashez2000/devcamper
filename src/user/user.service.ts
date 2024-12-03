import AppError from '../utils/app-error'
import User from './user.model'
import { CreateUserDto } from './user.dto'

export async function createUser(data: CreateUserDto) {
  return await User.create(data)
}

export async function getUserById(id: string) {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(`user (${id}) not found`, 404)
  }
  return user
}
