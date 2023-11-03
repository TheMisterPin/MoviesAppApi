import express from 'express';

import { uploadMovie,  deleteMovie, getAllMovies, updateMovieByTitle } from '../controllers/moviesController';
import {getMovieByGenre, getMovieByTitle } from '../db/movies';



export default (router : express.Router)=>{
    router.get('/movies', getAllMovies)
    router.post('/movies/upload', uploadMovie)
    router.delete('/movies/:id', deleteMovie)
    router.get('/movies/genres/:genre', getMovieByGenre)
    router.get('/movies/title/:title', getMovieByTitle)
    router.patch('/movies/title/:title', updateMovieByTitle)
}
