import User from '../user/user.model'

export async function dropDb() {
  await User.deleteMany()
}

export async function createJohnDoe() {
  return await User.create({
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '1234',
    role: 'publisher',
  })
}
