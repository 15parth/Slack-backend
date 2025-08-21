import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import userRepository from '../repositories/userRepository.js'
import { createJWT } from '../utils/common/authUtils.js'
import ClientError from '../utils/errors/clientError.js'
import ValidationError from '../utils/errors/validationErrors.js'

export const signup = async (data) => {
  try {
    const newUser = await userRepository.create(data)
    return newUser
  } catch (error) {
    console.error('Error creating user in User service:', error)
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message)
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: 'Email or Username already exists'
        },
        'Email or Username already exists'
      )
    }
  }
}

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email)
    if (!user) {
      throw new ClientError({
        message: 'Invalid email or password',
        statusCode: StatusCodes.NOT_FOUND,
        explanation: 'The email provided does not match any user in our records'
      })
    }

    //match the password with the hashed password
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new ClientError({
        message: 'Invalid email or password',
        statusCode: StatusCodes.UNAUTHORIZED,
        explanation: 'The password provided is incorrect'
      })
    }

    return {
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      token: createJWT({ id: user._id, email: user.email })
    }
  } catch (error) {
    console.error('Error signing in user:', error)
    throw error
  }
}
