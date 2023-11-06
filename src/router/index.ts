import express from 'express';
import autenthication from './autenthication';
import users from './usersRouter';
import genres from './genresRouter';
import movies from './moviesRouter';


const router = express.Router()
export default (): express.Router => {
    autenthication(router);
    users(router);
    genres(router);
    movies(router)    
    return router;
}