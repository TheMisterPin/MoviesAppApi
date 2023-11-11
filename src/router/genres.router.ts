import express from 'express';

import { deleteGenre, getAllGenres, updateGenreByName, uploadGenre, bulkUploadGenres } from '../controllers/genre.contoller';


// import { isAuthenticated} from '../middlewares/index';




export default (router : express.Router)=>{
    router.get('/genres', getAllGenres)
    router.post('/genres/upload', uploadGenre)
    router.post('/genres/bulkupload', bulkUploadGenres)
    router.delete('/genres/:id', deleteGenre)
    router.patch('/genres/genre/:id', updateGenreByName)
    return router
}
