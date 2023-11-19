// import { extractIdMiddleware } from "../middlewares/tokenCheckerMiddleware";
import { login } from '../controllers/authentication.controller'


import { createUser } from '../controllers/authentication.controller'
import express from 'express'
import { extractTokenMiddleware } from '../middlewares/tokenExtractor'



export default (router: express.Router) => {

	router.post('/auth/login', login)
	// router.post('/auth/logout', logout)
	router.post('/create', createUser)
	router.get('/incomingtoken', extractTokenMiddleware)
	return router
}


// const logTokendetails = (req: express.Request, res: express.Response) => {
// 	res.json(req)
// }



