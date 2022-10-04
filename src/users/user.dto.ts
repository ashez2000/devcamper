import { Types } from 'mongoose'

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface SigninDto {
  email: string
  password: string
}

export interface UserDto {
  _id: Types.ObjectId
  name: string
  email: string
  role: string
}
