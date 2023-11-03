import mongoose from "mongoose";
import { MovieModel } from "./movies";

const GenreSchema = new mongoose.Schema({
    genre: {type: String , required: true, unique: true},
    movies: {type: MovieModel, required: true,},

    })

export const GenreModel = mongoose.model('Genre', GenreSchema)
export const getGenres= () => GenreModel.find()
export const getGenreByName= (genre: string) => GenreModel.findOne({genre})
export const getGenreById= (id: string) => GenreModel.findById(id)
export const createGenre= (values: Record<string, any>) => new GenreModel(values).save() .then(genre => genre.toObject())
export const deleteGenreById= (id: string) => GenreModel.findByIdAndDelete({_id: id})