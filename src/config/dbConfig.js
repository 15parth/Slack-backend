import mongose from 'mongoose'

import { DEV_DB_URI, NODE_ENV } from './serverConfig.js'

export default async function connectToDatabase() {
  try {
    await mongose.connect(DEV_DB_URI)

    console.log(`Database connected successfully from ${NODE_ENV} environment`)
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}
