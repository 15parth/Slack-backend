import { z } from 'zod'

export const workspaceSchemaValidator = z.object({
  name: z.string().min(3).max(50)
})

export const addMemberToWorkspaceSchemaValidator = z.object({
  memberId: z.string().nonempty({ message: 'MemberId is required' })
})

export const addChannelToWorkspaceSchemaValidator = z.object({
  name: z.string().nonempty({ message: 'Channel name is required' })
})
