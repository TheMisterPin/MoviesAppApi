import express from 'express';
import { getMovies, deleteMovieById, updateMovieById, getMovieByName, MovieModel } from '../models/moviesmiei';
import { Request, Response } from 'express';
import UserModel from '../models/users.model';
import { GenreModel } from '../models/genre.model';
import mongoose from 'mongoose';



export const getAllMovies = async (req: express.Request, res: express.Response) => {
    try {
        const movies = await getMovies();
        return res.status(200).json(movies)
    } catch (error) {
        res.status(400)
    }

}




export const getMovieByTitle = async (req: Request, res: Response) => {
    try {
        const title = req.params.title;
        console.log(`Fetching movie with title: ${title}`); 
        const movie = await MovieModel.findOne({ title: title });
        if (!movie) {
            console.log(`Movie with title "${title}" not found.`); 
            return res.status(404).json({ message: 'Movie not found' });
        }
        console.log(`Movie found: ${JSON.stringify(movie)}`); 
    } catch (error) {
        console.error(`Error fetching movie with title "${req.params.title}": ${error.message}`); 
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

export const getMovieByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Fetching movie with ID: ${id}`);
    try {
      const movie = await MovieModel.findById(id);
      if (!movie) {
        console.log(`Movie not found with ID: ${id}`);
        return res.status(404).json({ message: 'Movie not found' });
      }
      return res.json(movie);
    } catch (error) {
      console.error(`Error fetching movie with ID "${id}": ${error.message}`);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  
  
  export const getMovieByTitleController = async (req: Request, res: Response) => {
    const { title } = req.params;
    try {
      const movie = await MovieModel.findOne({ title: title });
      if (!movie) {
        console.log(`Movie not found with title: ${title}`);
        return res.status(404).json({ message: 'Movie not found' });
      }
      return res.json(movie);
    } catch (error) {
      console.error(`Error fetching movie with title "${title}": ${error.message}`);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  export const getMovieByGenreController = async (req: Request, res: Response) => {
    const { genre } = req.params;
    try {
      const movie = await MovieModel.find({ genre : genre });
      if (!movie) {
        console.log(`Movie not found with genre: ${genre}`);
        return res.status(404).json({ message: 'Movie not found' });
      }
      return res.json(movie);
    } catch (error) {
      console.error(`Error fetching movie with title "${genre}": ${error.message}`);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };



  export const uploadMovie = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, poster, genre, length, rating, votes, trailer, year } = req.body;
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'Missing UserID' });
        }

        if (!title || !description || !poster || !genre || !length || !rating || !trailer || !year || !votes) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingMovie = await getMovieByName(title);

        if (existingMovie) {
            return res.status(409).json({ message: 'Movie already exists' });
        }

        const newMovie = await MovieModel.create({ 
            title, 
            description, 
            poster, 
            genre, 
            length, 
            rating, 
            trailer, 
            year, 
            votes, 
            creator: userId 
        });

        await UserModel.findByIdAndUpdate(userId, {
            $push: { movies: newMovie._id }
        });

        const genreDocument = await GenreModel.findOneAndUpdate({ genre }, {
            $push: { movies: newMovie._id }
        }, { new: true });

        if (!genreDocument) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        return res.status(201).json(newMovie);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
