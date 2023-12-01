import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { authRouter } from './routes/auth'
import { protectedRouter } from './routes/protected'
import cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(bodyParser.json());
app.use(cookieParser())


app.use('/auth', authRouter)
app.use('/api', protectedRouter)

app.listen(port, () => {
    console.log("[server]: Server running at port ", port)
})
