import express from 'express';

import { deleteUser, getAllUsers, getUserById, getUserByEmail, getUserByUsername, getUserMovies, deleteUserByName, getUserMoviesById } from '../controllers/users.controller'
import *  as authenticated from '../middlewares/tokenCheckerMiddleware'
import { updateUser, updateUserByName } from '../controllers/authentication.controller'

export default (router : express.Router)=>{

	router.get('/users', getAllUsers)
	router.delete('/users/:id', deleteUser)
	router.get('/users/:id', getUserById)
	router.put('/users/:id', updateUser)
	router.get('/users/email/:email', getUserByEmail)
	router.get('/users/name/:username', getUserByUsername)
	router.put('/users/name/:user', updateUserByName)
	router.delete('/users/name/:username', deleteUserByName)
	router.get('/users/movies/user/:username', getUserMovies)
	router.get('/users/movies/:id', getUserMoviesById)
	
}



