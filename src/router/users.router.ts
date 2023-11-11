import express from 'express';

import { deleteUser, getAllUsers } from '../controllers/users.controller';
import { isAuthenticated} from '../middlewares';
import { updateUserById } from '../models/users.model';

 

export default (router : express.Router)=>{
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id',isAuthenticated, deleteUser)
    router.patch('/users/:id', updateUserById)
}
