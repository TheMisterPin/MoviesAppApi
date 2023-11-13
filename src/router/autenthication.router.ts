import { tokenCheckerMiddleware } from "../middlewares/tokenCheckerMiddleware";
import { login, logout, protectedRequest, register } from "../controllers/authentication.controller";
import express from 'express';

export default (router: express.Router) =>{
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    router.post('/auth/logout', logout)
    router.get('/protected', tokenCheckerMiddleware, protectedRequest)
    return router
}
