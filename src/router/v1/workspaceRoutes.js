import express from 'express'

import {
  addChannelToWorkspaceController,
  addMembersToWorkspaceController,
  createWorkspaceController,
  deleteWorkspace,
  getWorkspaceByJoinCodeController,
  getWorkspaceController,
  getWorkspacesUserIsMemberOfController
} from '../../controllers/workspaceController.js'
import { isAuthenticated } from '../../middlewares/authMiddleware.js'
import {
  addChannelToWorkspaceSchemaValidator,
  addMemberToWorkspaceSchemaValidator,
  workspaceSchemaValidator
} from '../../validators/workspaceSchemaValidator.js'
import { validate } from '../../validators/zodValidators.js'

const router = express.Router()

router.post(
  '/',
  isAuthenticated,
  validate(workspaceSchemaValidator),
  createWorkspaceController
)

router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController)

router.delete('/:workspaceId', isAuthenticated, deleteWorkspace)

router.get('/:workspaceId', isAuthenticated, getWorkspaceController)

router.get('/join/:joinCode', isAuthenticated, getWorkspaceByJoinCodeController)

router.put(
  '/:workspaceId/members',
  isAuthenticated,
  validate(addMemberToWorkspaceSchemaValidator),
  addMembersToWorkspaceController
)

router.put(
  '/:workspaceId/channels',
  isAuthenticated,
  validate(addChannelToWorkspaceSchemaValidator),
  addChannelToWorkspaceController
)

export default router
