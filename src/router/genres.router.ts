import express from 'express'

import { deleteGenre, getAllGenres, updateGenreByName, uploadGenre } from '../controllers/genre.contoller'



export default (router : express.Router)=>{
	router.get('/genres', getAllGenres)
	router.post('/genres/upload', uploadGenre)
	router.delete('/genres/:id', deleteGenre)
	router.patch('/genres/genre/:id', updateGenreByName)
	return router
}
