import express from 'express';

import { deleteGenre, getAllGenres } from '../controllers/genreController';
import { GenreModel, createGenre } from '../db/genre';
import { isCreator, isAuthenticated} from '../middlewares/index';




export default (router : express.Router)=>{
    router.get('/genres', getAllGenres)
   router.delete('/genres/:id', isAuthenticated, isCreator(GenreModel),deleteGenre)
    router.post('/genres/upload', isAuthenticated, createGenre)
}
