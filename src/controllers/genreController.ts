import express from 'express';


import { getGenres, deleteGenreById, getGenreByName, createGenre, } from '../db/genre';

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

export const uploadGenre = async (req: express.Request, res: express.Response) => {
    try {
        const { genre, movies,  } = req.body;
        if (!movies || !genre) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingGenre = await getGenreByName(genre);

        if (existingGenre) {
            return res.status(409).json({ message: 'Genre already exists' });
        }


        const newMovie = await createGenre({ movies, genre, });
        return res.status(201).json(newMovie);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};