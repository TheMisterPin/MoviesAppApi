import express from 'express';

import { uploadMovie, deleteMovie, getAllMovies, updateMovieByTitle } from '../controllers/moviesController';
import { MovieModel, getMovieByGenre, getMovieByTitle } from '../db/movies';
import { isAuthenticated, isCreator } from '../middlewares';



export default (router: express.Router) => {
    router.get('/movies', getAllMovies)
    router.post('/movies/upload', isAuthenticated,isCreator(MovieModel), uploadMovie)
    router.delete('/movies/:id', isCreator(MovieModel), deleteMovie)
    router.get('/movies/genres/:genre', getMovieByGenre)
    router.get('/movies/title/:title', getMovieByTitle)
    router.patch('/movies/title/:title', isCreator(MovieModel), updateMovieByTitle)
}