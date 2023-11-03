import express from 'express';


import { getGenres, deleteGenreById, } from '../db/genre';

export const getAllGenres = async (req: express.Request, res: express.Response) => {
    try {
        const genres = await getGenres();
        return res.status(200).json(genres)
    } catch (error) {
        res.status(400)
    }

}

export const deleteGenre = async (req: express.Request, res: express.Response) => {
    try {
        const deletedGenre = await deleteGenreById(req.params.id);
        return res.status(200).json(deletedGenre)
    } catch (error) {
        res.status(400)
    }

}

