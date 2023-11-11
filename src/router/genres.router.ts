import express from 'express';

import { deleteGenre, getAllGenres, uploadGenre } from '../controllers/genre.contoller';

import { isAuthenticated} from '../middlewares/index';




export default (router : express.Router)=>{
    router.get('/genres', getAllGenres)
   router.delete('/genres/:id', isAuthenticated,deleteGenre)
    router.post('/genres/upload', isAuthenticated, uploadGenre)
}
