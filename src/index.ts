import express, {Express} from "express"
import {config} from 'dotenv'
import routes from './routes'
import cors from 'cors'
import connectToDatabase from './config/databaseConnection'
import errorHandler from "./middleware/errorHandler.middleware"
config()

const app: Express = express()
app.use(cors())
app.use(express.json())
routes(app)

app.use(errorHandler)

const port: string = process.env.PORT!

app.listen(port, async () => {
    await connectToDatabase()
    console.log(`App listening on port ${port}`)
})

