import express from 'express'

import { deleteUser, getAllUsers, getUserById, getUserByEmail, getUserByUsername, getUserMovies, deleteUserByName, getUserMoviesById } from '../controllers/users.controller'
import { tokenCheckerMiddleware } from '../middlewares/tokenCheckerMiddleware'
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
	router.get('/userdata', tokenCheckerMiddleware, getUserData)
}



const getUserData= (req, res) => {
	if (!req.user) {
		return res.status(401).send('User not authenticated')
	}


	const userId = req.user.sub
	const nickname = req.user.nickname
	const email = req.user.email


	res.json({ userId, nickname, email })
}