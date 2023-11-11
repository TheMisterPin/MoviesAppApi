import { bulkRegisterUsers } from "../controllers/users.controller";
import { login, logout, register } from "../controllers/authentication.comtroller";
import express from 'express';

export default (router: express.Router) =>{
    router.post('/auth/register', register)
    router.post('/auth/bulkregister', bulkRegisterUsers)
    router.post('/auth/login', login)
    router.post('/auth/logout', logout)
    
    return router
}
