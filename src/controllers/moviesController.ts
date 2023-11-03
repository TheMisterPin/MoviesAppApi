import express from 'express';
import { getMovies, deleteMovieById, updateMovieById, getMovieByTitle, createMovie, MovieModel } from '../db/movies';



export const getAllMovies = async (req: express.Request, res: express.Response) => {
    try {
        const movies = await getMovies();
        return res.status(200).json(movies)
    } catch (error) {
        res.status(400)
    }

}

export const getMoviesByTitle = async (req: express.Request, res: express.Response) => {
    try {
        const title = req.params.title;
        const movie = await MovieModel.findOne({ title: title });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const deleteMovie = async (req: express.Request, res: express.Response) => {
    try {
        const deletedMovie = await deleteMovieById(req.params.id);
        return res.status(200).json(deletedMovie)
    } catch (error) {
        res.status(400)
    }
}

export const updateMovie = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { title } = req.body
        if (!title) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const movie = await updateMovieById(id, req.body)
        await movie.save();
        return res.status(200).json(movie)
    } catch (error) {
        res.status(400)
    }
}
export const updateMovieByTitle = async (req: express.Request, res: express.Response) => {
    try {
        const title = req.params.title;
        const updateData = req.body;
        const movie = await MovieModel.findOneAndUpdate({ title: title }, updateData, { new: true });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const uploadMovie = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, poster, genre, length, rating, trailer, year } = req.body;
        if (!title || !description || !poster || !genre || !length || !rating || !trailer || !year) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingMovie = await getMovieByTitle(title);

        if (existingMovie) {
            return res.status(409).json({ message: 'Movie already exists' });
        }


        const newMovie = await createMovie({ title, description, poster, genre, length, rating, trailer, year });
        return res.status(201).json(newMovie);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};