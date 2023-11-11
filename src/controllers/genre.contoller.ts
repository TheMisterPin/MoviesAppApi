import express from 'express';


import { getGenres, deleteGenreById, getGenreByName, createGenre, GenreModel, } from '../models/genre.model';


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
        const { genre, image } = req.body;
        if (!genre || !image) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingGenre = await getGenreByName(genre);

        if (existingGenre) {
            return res.status(409).json({ message: 'Genre already exists' });
        }

        
        const newGenre = await createGenre({ genre, image });
        return res.status(201).json(newGenre);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateGenreByName = async (req: express.Request, res: express.Response) => {
    try {
        const genreParam = req.params.genre;
        const updateData = req.body;
        const genre = await GenreModel.findOneAndUpdate({ genre: genreParam }, updateData, { new: true });
        if (!genreParam) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        return res.status(200).json(genre);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};