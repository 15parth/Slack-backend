import { z } from 'zod'

export const userSignupSchema = z.object({
  userName: z.string(),
  email: z.string(),
  password: z.string()
})

export const userSignInSchema = z.object({
  email: z.string(),
  password: z.string()
})
