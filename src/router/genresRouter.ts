import express from 'express';

import { deleteGenre, getAllGenres } from '../controllers/genreController';



export default (router : express.Router)=>{
    router.get('/genres', getAllGenres)
    router.delete('/genres/:id', deleteGenre)
}
