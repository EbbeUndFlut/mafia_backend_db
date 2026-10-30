import express from 'express'
import cors from 'cors'
import { router as catRouter } from './src/router/cat.router.js'
import { router as clanRouter } from './src/router/clan.router.js'

process.loadEnvFile('.env')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', catRouter)
app.use('/api', clanRouter)



app.listen(PORT, () => console.log('Ein Mautzi erscheint in Port', PORT))