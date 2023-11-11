import express from 'express';

import { uploadMovie, deleteMovie, getAllMovies, updateMovieByTitle, getMovieByIdController, getMovieByTitleController, getMovieByGenreController } from '../controllers/movies.controller';
import { updateMovieById } from '../models/moviesmiei';





export default (router: express.Router) => {
    router.get('/movies', getAllMovies)
    router.post('/movies/upload/:userId', uploadMovie)
    router.delete('/movies/:id', deleteMovie)
    router.get('/movies/genres/:genre', getMovieByGenreController)
    router.get('/movies/:id', getMovieByIdController)
    router.get('/movies/title/:title', getMovieByTitleController)
    router.patch('/movies/title/:title', updateMovieByTitle)
    router.patch('/movies/:id', updateMovieById)
    return router
}
