const User = require('../models/user.model')
const ErrorResponse = require('../utils/error.util')

class UserNotFound extends ErrorResponse {
  constructor(id) {
    super(`Bootcamp with id ${id} not found`, 404)
  }
}

/**
 * @desc Create new user
 * @param {object} data
 * @returns {Promise<User>}
 */
exports.create = async (data) => {
  const user = await User.create(data)
  return user
}

/**
 * @desc Get all users
 * @returns {Promise<User[]>}
 * @throws {UserNotFound}
 */
exports.findById = async (id) => {
  const user = await User.findById(id)
  if (!user) throw new UserNotFound(id)
  return user
}

/**
 * @desc Get all users
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
exports.findByCredential = async (email, password) => {
  const user = await User.findByCredentials(email, password)
  return user
}
