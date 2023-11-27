import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import router from './router'



const app = express()
const PORT = process.env.PORT
const server = http.createServer(app)

app.use(cors({ credentials: true }))
app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

server.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`)
})

app.use('/', router())



