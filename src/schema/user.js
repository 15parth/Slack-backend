import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already exists'],

      match: [
        /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    userName: {
      type: String,
      required: [true, 'Username is required']
    },
    avatar: {
      type: String,
      default: 'https://example.com/default-avatar.png'
    }
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  const user = this
  const SALT = bcrypt.genSaltSync(9)
  const hashedPassword = bcrypt.hashSync(user.password, SALT)
  user.password = hashedPassword

  // Generate a default avatar based on the username
  if (!user.avatar) {
    user.avatar = `https://robohash.org/${user.userName}`
  }
  next()
})

const User = mongoose.model('User', userSchema)

export default User
