import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import router from './router'
// import { auth } from 'express-oauth2-jwt-bearer'
const app = express()

app.use(cors({ credentials: true }))
app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

const IP_ADDRESS = '127.0.0.1'
const PORT = 2323

server.listen(PORT, IP_ADDRESS, () => {
	console.log(`Server is listening on ${IP_ADDRESS}:${PORT}`)
})


app.use('/', router())



// const jwtCheck = auth({
// 	audience: 'http://localhost:2323',
// 	issuerBaseURL: 'https://dev-7esko0bv6fmmtrd5.us.auth0.com/',
// 	tokenSigningAlg: 'RS256'
// })
// app.use(jwtCheck)

// app.get('/authorized', function (req, res) {
// 	res.json('')
// })
