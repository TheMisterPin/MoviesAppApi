// import { extractIdMiddleware } from "../middlewares/tokenCheckerMiddleware";



import { createUser, loginAuth0 } from '../controllers/authentication.controller'
import express from 'express'





export default (router: express.Router) => {
	router.post('/create', createUser)
	router.post('/auth0', loginAuth0)
	return router
}




