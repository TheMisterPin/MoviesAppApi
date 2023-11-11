import express from 'express';

import { deleteUser, getAllUsers,updateUser, getUserById } from '../controllers/users.controller'


 

export default (router : express.Router)=>{
    router.get('/users', getAllUsers)
    router.delete('/users/:id', deleteUser)
    router.get('/users/:id', getUserById)
    router.patch('/users/:id', updateUser)
}
