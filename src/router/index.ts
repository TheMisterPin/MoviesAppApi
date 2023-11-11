import express from 'express';
import autenthication from './autenthication.router';
import users from './users.router';
import genres from './genres.router';
import movies from './movies.router';


const router = express.Router()
export default (): express.Router => {
    autenthication(router)
    users(router)
    genres(router)
    movies(router)   
    return router
}