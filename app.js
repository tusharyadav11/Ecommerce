import express, { urlencoded } from 'express'
const app = express()
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

app.use(express.json)
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser)

//morgan logger
app.use(morgan('tiny')){

}



export default app