import { StatusCodes } from 'http-status-codes'

import { getMessageService } from '../service/messageService.js'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js'
import ClientError from '../utils/errors/clientError.js'

export const getMessagesController = async (req, res) => {
  try {

    if(!req.query.channelId){
      throw new ClientError({
        explanation:'Channel id is required to fetch messages',
        message:'Please provide channel Id',
        statusCode: StatusCodes.BAD_REQUEST
      })
    }

    const messages = await getMessageService(
      { channelId: req.params.channelId},
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    )

    return res
      .status(StatusCodes.OK)
      .json(successResponse(messages, 'Messages fetched successfully'))
  } catch (error) {
    console.log('getMessagesController error:', error)

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
