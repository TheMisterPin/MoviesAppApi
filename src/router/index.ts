import express from 'express';
import autenthication from './autenthication';
const router = express.Router()
import users from './usersRouter';
import genres from './genresRouter';

export default (): express.Router => {
    autenthication(router);
    users(router);
    genres(router);
    
    return router;
}