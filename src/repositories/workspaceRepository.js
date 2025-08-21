import { StatusCodes } from 'http-status-codes'

import User from '../schema/user.js'
import Workspace from '../schema/workspaceSchema.js'
import ClientError from '../utils/errors/clientError.js'
import channelRepository from './channelRepository.js'
import crudRepository from './crudRepository.js'

const workspaceRepository = {
  ...crudRepository(Workspace),

  getWorkspaceDetailsById: async function (workspaceId) {
    const workspace = await Workspace.findById(workspaceId)
      .populate('members.memberId', 'username email avatar')
      .populate('channels')

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: `Workspace does not exists`,
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    return workspace
  },

  getWorkspaceByName: async function (WorkspaceName) {
    const workspace = await Workspace.findOne({ name: WorkspaceName })

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: `Workspace ${WorkspaceName} does not exists`,
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    return workspace
  },

  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({ joinCode })

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: `Workspace with ${joinCode} does not exists`,
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    return workspace
  },

  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId)

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isValidUser = await User.findById(memberId)

    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId.toString() === memberId.toString()
    )

    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'User is already a member of the workspace',
        message: 'Member already exists',
        statusCode: StatusCodes.CONFLICT
      })
    }

    workspace.members.push({ memberId, role })
    await workspace.save()

    return workspace
  },

  addChannelToWorkspace: async function (workspaceId, channelName) {
    const workspace = await Workspace.findById(workspaceId).populate('channels')
    if (!workspace) {
      throw new ClientError({
        explanation: 'No workspace found with the given ID',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name === channelName
    )

    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Channel already a part of the workspace',
        statusCode: StatusCodes.CONFLICT
      })
    }

    const channel = await channelRepository.create({
      name: channelName,
      workspaceId: workspaceId
    })

    workspace.channels.push(channel._id)
    await workspace.save()

    await Workspace.findById(workspace._id)
      .populate('members.memberId', 'userName email avatar')
      .populate('channels', 'name workspaceId')

    return workspace
  },

  fetchAllWorkspacesByMemberId: async function (memberId) {
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate({ path: 'members.memberId', select: 'userName email avatar' })

    return workspaces
  }
}

export default workspaceRepository
