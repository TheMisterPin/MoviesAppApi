import { login, logout, register } from "../controllers/authentication.comtroller";
import express from 'express';

export default (router: express.Router) =>{
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    router.post('/auth/logout', logout)
    return router
}
