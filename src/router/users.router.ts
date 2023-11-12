import express from 'express';

import { deleteUser, getAllUsers,updateUser, getUserById, getUserByEmail, getUserByUsername } from '../controllers/users.controller'




export default (router : express.Router)=>{
    router.get('/users', getAllUsers)
    router.delete('/users/:id', deleteUser)
    router.get('/users/:id', getUserById)
    router.get('/users/:email', getUserByEmail)
    router.get('/users/:username', getUserByUsername)
    router.patch('/users/:id', updateUser)
}
