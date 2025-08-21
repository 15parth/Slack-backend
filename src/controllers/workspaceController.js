import { StatusCodes } from 'http-status-codes'

import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getworkspaceByJoinCodeService,
  getWorkspaceService,
  getWorkspaceUserIsMemberOfService
} from '../service/workspaceService.js'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js'

export const createWorkspaceController = async (req, res) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user
    })

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'workspace created successfully'))
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
  try {
    const response = await getWorkspaceUserIsMemberOfService(req.user)

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspce fetched successfully'))
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const deleteWorkspace = async (req, res) => {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    )

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'))
  } catch (error) {
    console.log('Delete Workspace Controller Error:', error)

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspaceController = async (req, res) => {
  try {
    const response = await getWorkspaceService(req.params.workspaceId, req.user)

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'))
  } catch (error) {
    console.log('Get workspace controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspaceByJoinCodeController = async (req, res) => {
  // console.log('this is req--->',req.res);
  try {
    const response = await getworkspaceByJoinCodeService(
      req.params.joinCode,
      req.user
    )

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'))
  } catch (error) {
    console.log('Get workspace by Join code controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const addChannelToWorkspaceController = async (req, res) => {
  try {
    const response = await addChannelToWorkspaceService(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    )

    return res
      .status(StatusCodes.CREATED)
      .json(
        successResponse(response, 'channel added to workspace successfully')
      )
  } catch (error) {
    console.log('addChannelToWorkspaceController error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const addMembersToWorkspaceController = async (req, res) => {

  try {
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    )

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Member added to a workspace successfully')
      )
  } catch (error) {
    console.log('addMembersToWorkspaceController error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
