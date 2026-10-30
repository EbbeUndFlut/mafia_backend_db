import express from 'express'
process.loadEnvFile('.env')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())


app.listen(PORT, () => console.log('Ein Mautzi erscheint in Port', PORT))