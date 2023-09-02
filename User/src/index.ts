import connectToDb from './config/connectDb'
import { mqClient } from './events/mq/rpc'
import { app } from './server'
require('dotenv').config()

const start = async () => {
  await connectToDb(process.env.MONGO_URI!)

  setTimeout(async () => {
    await mqClient.connect(
      process.env.EXCHANGE_NAME!,
      process.env.MSG_QUEUE_URL!
    )

    console.log('connected to rabbit mq')
    console.log(process.env.EXCHANGE_NAME!)
    console.log( process.env.MSG_QUEUE_URL!)
  }, 60000)

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}

start()
