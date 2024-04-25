import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
 
import corsOptions from './server/config/cors.conf'
import appRouter from './server/route/router'


 
const app = express()
const port = 3001





app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))

app.use(appRouter) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))