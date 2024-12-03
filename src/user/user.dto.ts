export type CreateUserDto = {
  name: string
  email: string
  password: string
  role: 'user' | 'publisher'
}
