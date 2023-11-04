import express from 'express';
import autenthication from './autenthication';
const router = express.Router()
import users from './usersRouter';
import genres from './genresRouter';
import movies from './moviesRouter';

export default (): express.Router => {
    autenthication(router);
    users(router);
    genres(router);
    movies(router)    
    return router;
}