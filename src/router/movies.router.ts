import express from 'express';
import { getAllMovies, uploadMovie, updateMovie, deleteMovie, getMovieById, getMovieByTitle } from '../controllers/movies.controller';
import { tokenCheckerMiddleware } from '../middlewares/tokenCheckerMiddleware';


export default (router : express.Router)=>{
router.get('/movies', getAllMovies);
router.get('/movie/:id', getMovieById);
router.post('/upload/:id',uploadMovie);
router.patch('/movie/:id', updateMovie);
router.delete('/movie/:id', deleteMovie);
router.get('/title/:title', getMovieByTitle);
return router
}
