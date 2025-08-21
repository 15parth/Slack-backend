import { StatusCodes } from 'http-status-codes'

import userRepository from '../repositories/userRepository'
import workspaceRepository from '../repositories/workspaceRepository'
import ClientError from '../utils/errors/clientError'
import { isUserMemberOfWorkspace } from './workspaceService'

export const isMemberPartOfWorkspaceService = async (workspaceId, memberId) => {
  const workspace = await workspaceRepository.getById(workspaceId)

  if (!workspace) {
    throw new ClientError({
      explanation: 'Workspace not found',
      message: 'You do not have access to this workspace',
      statusCode: StatusCodes.NOT_FOUND
    })
  }

  const isUserAMember = isUserMemberOfWorkspace(workspace, memberId)

  if (!isUserAMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'You do not have access to this workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    })
  }

  const user = await userRepository.getById(memberId)

  return user
}
