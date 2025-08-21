import express from 'express'

import { signIn, signUp } from '../../controllers/userController.js'
import {
  userSignInSchema,
  userSignupSchema
} from '../../validators/userSchema.js'
import { validate } from '../../validators/zodValidators.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Users endpoint')
})

router.post('/signup', validate(userSignupSchema), signUp)
router.post('/signin', validate(userSignInSchema), signIn)

export default router
