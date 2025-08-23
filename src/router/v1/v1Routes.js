import express from 'express'

import channelRouter from './channelRouter.js'
import memberRouter from './memberRoutes.js'
import messageRouter from './messagesRoute.js'
import users from './users.js'
import workspaceRouter from './workspaceRoutes.js'


const router = express.Router()

router.use('/users', users)

router.use('/workspace', workspaceRouter)

router.use('/channels', channelRouter)

router.use('/members', memberRouter)

router.use('/messages', messageRouter)

export default router
