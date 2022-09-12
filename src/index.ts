import express, {Express} from "express"
import {config} from 'dotenv'
import routes from './routes'
import cors from 'cors'
import connectToDatabase from './config/databaseConnection'
config()

const app: Express = express()
app.use(cors())
app.use(express.json())
routes(app)

const port: string = process.env.PORT!

app.listen(port, async () => {
    await connectToDatabase()
    console.log(`App listening on port ${port}`)
})

