import express from 'express';

import { uploadMovie, deleteMovie, getAllMovies, updateMovieByTitle, getMovieByIdController, getMovieByTitleController } from '../controllers/moviesController';
import { getMovieByGenre } from '../db/movies';
import { isAuthenticated } from '../middlewares';



export default (router: express.Router) => {
    router.get('/movies', getAllMovies)
    router.post('/movies/upload', isAuthenticated, uploadMovie)
    router.delete('/movies/:id', isAuthenticated, deleteMovie)
    router.get('/movies/genres/:genre', getMovieByGenre)
    router.get('/movies/:id', getMovieByIdController);
    router.get('/movies/title/:title', getMovieByTitleController);
    router.patch('/movies/title/:title', updateMovieByTitle)
    return router;
}
