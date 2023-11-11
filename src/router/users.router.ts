import express from 'express';

import { deleteUser, getAllUsers } from '../controllers/users.controller'
import { updateUserById } from '../models/users.model'
import { getUserById } from 'models/mieiusers'

 

export default (router : express.Router)=>{
    router.get('/users', getAllUsers)
    router.delete('/users/:id', deleteUser)
    router.get('/users/:id', getUserById)
    router.patch('/users/:id', updateUserById)
}
