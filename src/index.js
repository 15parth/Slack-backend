import express from 'express'
import  { createServer } from 'http'
import { Server } from 'socket.io'

import bullServerAdapter from './config/bullBoardConfig.js'
import connectToDatabase from './config/dbConfig.js'
import { PORT } from './config/serverConfig.js'
import channelSocketHandler from './controllers/channelSocketController.js'
import messageSocketHandler from './controllers/messageSocketController.js'
import apiRouter from './router/apiRoutes.js'

const app = express()
const server = createServer(app);
const io = new Server(server);

// console.log(io)
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
 
app.use('/ui', bullServerAdapter.getRouter())

// Routes
app.use('/api', apiRouter)

io.on('connection', (socket)=>{

  console.log('this is inside the socket')
  messageSocketHandler(io,socket);
  channelSocketHandler(io,socket);

})

const startServer = async () => {
  try {
    await connectToDatabase()

    server.listen(PORT || 3000, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT || 3000}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
