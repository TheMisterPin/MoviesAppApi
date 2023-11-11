import express from 'express';
import { Request, Response } from 'express';
import prisma from '../../db/client';


export const uploadMovie = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, poster, genre, length, rating, votes, trailer, year } = req.body;
        const { userId } = req.params;
        if (!title || !description || !poster || !genre || length === undefined || rating === undefined || !trailer || !year || votes === undefined || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'Id Not Found' });
        }
        const existingMovie = await prisma.movies.findUnique({ where: { title } });
        if (existingMovie) {
            return res.status(409).json({ message: 'Movie already exists' });
        }

        const genreRecord = await prisma.genre.findUnique({ where: { genre } });
        if (!genreRecord) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        const newMovie = await prisma.movies.create({
            data: {
                title,
                description,
                poster,
                length: parseInt(length),
                votes: parseInt(votes),
                rating: parseFloat(rating),
                trailer,
                year: parseInt(year),
                creator: { connect: { id: userId } },
                genre: { connect: { id: genreRecord.id } }
            }
        });
   
        await prisma.user.update({
            where: { id: userId },
            data: { movies: { connect: { id: newMovie.id } } }
        });

        await prisma.genre.update({
            where: { id: genreRecord.id },
            data: { movies: { connect: { id: newMovie.id } } }
        });

        return res.status(201).json(newMovie);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const 
getAllMovies = async (req: express.Request, res: express.Response) => {
    try {
        const movies = await prisma.movies.findMany();
        if (!movies) {
            return res.status(404).json({ message: 'No movies found' });
        }
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getMovieByTitle = async (req: express.Request, res: express.Response) => {
    try {
        const title = req.params.title;
        if (!title) {
            return res.status(400).json({ message: 'Title Not Found' });
        }
        const movie = await prisma.movies.findUnique({ where: { title } });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.json(movie);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const getMovieById = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Id Not Found' });
        }
        const movie = await prisma.movies.findUnique({ where: { id } });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.json(movie);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const getMovieByGenre = async (req: express.Request, res: express.Response): Promise<Response> => {
    try {
        const genreParams = req.params.genre;

        if (!genreParams) {
            return res.status(400).json({ message: 'Genre not provided' });
        }

        const genre = await prisma.genre.findUnique({ where: { genre: genreParams } });
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        const movies = await prisma.movies.findMany({ where: { genreId: genre.id } });
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this genre' });
        }

        return res.json(movies);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    try {
        const deletedMovie = await prisma.movies.delete({ where: { id: req.params.id } });
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json(deletedMovie);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const deleteMovieByTitle = async (req: express.Request, res: express.Response) => {
    try {
        const deletedMovie = await prisma.movies.delete({ where: { title: req.params.title } });
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json(deletedMovie);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const updateMovie = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing Id' });
        }
        const updateData = req.body;
        if (!updateData.title) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedMovie = await prisma.movies.update({ where: { id }, data: updateData });
        return res.status(200).json(updatedMovie);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const updateMovieByTitle = async (req: express.Request, res: express.Response) => {
    try {
        const { title } = req.params;
        if (!title) {
            return res.status(400).json({ message: 'Missing title' });
        }
        const updateData = req.body;
        if (!updateData.title) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedMovie = await prisma.movies.update({ where: { title }, data: updateData });
        return res.status(200).json(updatedMovie);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



