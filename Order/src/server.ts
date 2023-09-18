import express, { Request, Response } from 'express'
import connectToDb from './config/connectDb'
import { loadRoutes } from './routes'

const app = express()
app.use(express.json())

app.get('/product', async (req: Request, res: Response) => {
  res.send('Welcome to product application ')
})

loadRoutes(app)

app.use('*', async (req: Request, res: Response) => {
  const protocol = req.protocol
  const host = req.hostname
  const url = req.originalUrl
  const port = 8002

  const fullUrl = `${protocol}://${host}:${port}${url}`

  const responseString = `Full URL is: ${fullUrl}`
  res.send(responseString)
})

export { app }
