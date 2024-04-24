import express from 'express'
import appRouter from './server/route/router'
import cors from 'cors'
import corsOptions from './server/config/cors.conf'

const app = express()
const port = 3001

app.use(cors(corsOptions))

app.use(`/`, appRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))