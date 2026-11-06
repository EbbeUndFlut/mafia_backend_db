import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import { router as catRouter } from './src/router/cat.router.js'
import { router as clanRouter } from './src/router/clan.router.js'
import { router as regionRouter } from './src/router/region.router.js'

import './src/util/timedJobs.js'

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1', catRouter)
app.use('/api/v1', clanRouter)
app.use('/api/v1', regionRouter)



app.listen(PORT, () => console.log('Ein Mautzi erscheint in Port', PORT))