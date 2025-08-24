import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js'
import messageRepository from '../repositories/messageRepository.js'
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';

export const getMessageService = async (messageParams, page, limit,user) => {

  const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

  const  workspace = channelDetails.workspaceId;

  const isMember = isUserMemberOfWorkspace(workspace,user)

  if(!isMember){
    throw new ClientError({
      explanation:'User is not a member of this channel and can not get details',
      message:'Invalid data send from client',
      statusCode:StatusCodes.UNAUTHORIZED
    })
  }

  const messages = await messageRepository.getPaginatedMessages(
    messageParams,
    page,
    limit
  )
  return messages
}

export const createMessageService = async (message)=>{
  const newMessage = await messageRepository.create(message);

  console.log(newMessage)

  return message;
}
