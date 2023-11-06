import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: false },
    poster: { type: String, required: true, unique: true },
    genre: { type: String, required: true, unique: false },
    length: { type: Number, required: true, unique: false },
    votes: { type: Number, required: true, unique: false },
    rating: { type: Number, required: true, unique: false },
    trailer: { type: String, required: true, unique: true },
    year: { type: Number, required: true, unique: false },
})

export const MovieModel = mongoose.model('Movie', MovieSchema)

export const getMovies = () => MovieModel.find()
export const getMovieByGenre = (genre: string) => MovieModel.find({ genre })
export const getMovieByName = (title: string) => MovieModel.findOne({ title })
export const getMovieById = (id: string) => MovieModel.findById(id)
export const createMovie = (values: Record<string, any>) => new MovieModel(values).save().then(movie => movie.toObject())
export const updateMovieById = (id: string, values: Record<string, any>) => MovieModel.findByIdAndUpdate(id, values)
export const deleteMovieById = (id: string) => MovieModel.findByIdAndDelete({ _id: id })