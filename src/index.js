import express from 'express' 
import { createBullBoard } from '@bull-board/api';
import  { BullAdapter } from '@bull-board/api/bullAdapter.js';
import { ExpressAdapter } from '@bull-board/express';

import connectToDatabase from './config/dbConfig.js'
import { PORT } from './config/serverConfig.js'
import apiRouter from './router/apiRoutes.js'
import mailQueue from './queues/mailQueue.js';

const app = express()



// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const bullServerAdapter = new ExpressAdapter();
bullServerAdapter.setBasePath('/ui');


createBullBoard({
  queues:[new BullAdapter(mailQueue)],
  bullServerAdapter
});

app.use('/ui', bullServerAdapter.getRouter());

// Routes
app.use('/api', apiRouter)

// Global Error Handler

// Function to initialize server after DB connects
const startServer = async () => {
  try {
    await connectToDatabase()

    app.listen(PORT || 3000, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT || 3000}`)
    })

    //  await mailer.sendMail({
    //   from:'bhardwajparth069@gmail.com',
    //   to:'bhardwajparth069@gmail.com',
    //   subject:'Welcome mail',
    //   text:'Welcome to the platform'
    // })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
