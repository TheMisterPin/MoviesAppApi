import express from 'express';

import { deleteMovie, getAllMovies } from 'controllers/moviesController';
import { getMovieByGenre } from 'db/movies';



export default (router : express.Router)=>{
    router.get('/movies', getAllMovies)
    router.delete('/movies/:id', deleteMovie)
    router.get('/movies/genres/:id', getMovieByGenre)
}
