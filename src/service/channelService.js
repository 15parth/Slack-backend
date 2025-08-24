import { StatusCodes } from 'http-status-codes'

import channelRepository from '../repositories/channelRepository.js'
import ClientError from '../utils/errors/clientError.js'
import { isUserMemberOfWorkspace } from './workspaceService.js'
import messageRepository from '../repositories/messageRepository.js'

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId)
    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel not found',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isUserPartOfWorkspace = isUserMemberOfWorkspace(
      channel.workspaceId,
      userId
    )

    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        explanation:
          'user is not a member of workspace and can not get details of channel',
        message: 'Can not get details of channel',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }

    const messages = await messageRepository.getPaginatedMessages({
      channelId
    },
     1,
     20
  )

  console.log('messages --->', messages)


    return {
      messages,
      _id:channel._id,
      name:channel.name,
      createdAt:channel.createdAt,
      updatedAt:channel.updatedAt,
      workspaceId:channel.workspaceId
    };
  } catch (error) {
    console.log('getChannelByIdService error', error)
    throw error
  }
}
