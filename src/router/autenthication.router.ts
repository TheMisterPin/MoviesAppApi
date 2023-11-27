import { tokenCheckerMiddleware } from "../middlewares/tokenCheckerMiddleware";
import { login, logout, protectedRequest, register } from "../controllers/authentication.controller";
import express from 'express';

export default (router: express.Router) => {
	router.post('/create', createUser)
	router.post('/auth0', loginAuth0)
	return router
}




