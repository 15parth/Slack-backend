import User from '../schema/user.js'
import crudRepository from './crudRepository.js'

const userRepository = {
  ...crudRepository(User),
  getByEmail: async (email) => {
    const user = await User.findOne({ email })
    return user
  },
  getByUsername: async (username) => {
    const user = await User.findOne({ username }).select('-password')
    return user
  }
}

export default userRepository
