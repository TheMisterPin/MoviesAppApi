import express from 'express';
import { getAllMovies, uploadMovie, updateMovie, deleteMovie, getMovieById, getMovieByTitle } from '../controllers/movies.controller';


export default (router : express.Router)=>{
router.get('/', getAllMovies);
router.get('/title/:title', getMovieByTitle);
router.get('/:id', getMovieById);
router.post('/upload', uploadMovie);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/title/:title', getMovieByTitle);
return router
}
