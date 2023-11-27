import express from 'express'
import { getAllMovies, uploadMovie, updateMovie, deleteMovie, getMovieById, getMovieByTitle, getMovieByGenre, uploadAuth0Movie, deleteMovieByTitle } from '../controllers/movies.controller'




export default (router : express.Router)=>{
	router.get('/movies', getAllMovies)
	router.get('/movie/:id', getMovieById)
	router.post('/movie/upload/:userId',uploadMovie)
	router.post('/upload/:username', uploadAuth0Movie)
	router.patch('/movie/:id', updateMovie)
	router.delete('/movie/:id', deleteMovie)
	router.delete('/movie/title/', deleteMovieByTitle)
	router.get('/title/:title', getMovieByTitle)
	router.get('/movies/genre/:genre', getMovieByGenre)
	return router
}
