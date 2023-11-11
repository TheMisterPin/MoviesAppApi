import mongoose, {Document, model, Schema, } from 'mongoose';

interface MovieInterface extends Document  {
    title: string;
    description: string;
    poster: string;
    genre: string;
    length: number;
    votes: number;
    rating: number;
    trailer: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
    creator : Schema.Types.ObjectId

}


const MovieSchema = new Schema<MovieInterface>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: false },
    poster: { type: String, required: true, unique: true },
    genre: { type: String, required: true, unique: false },
    length: { type: Number, required: true, unique: false },
    votes: { type: Number, required: true, unique: false },
    rating: { type: Number, required: true, unique: false },
    trailer: { type: String, required: true, unique: true },
    year: { type: Number, required: true, unique: false },
    creator: [{type: Schema.Types.ObjectId, ref: 'User'}],



}, {timestamps: true, versionKey: false})

export const MovieModel = model<MovieInterface>("Movies", MovieSchema)

export const getMovies = () => MovieModel.find()
export const getMovieByGenre = (genre: string) => MovieModel.find({ genre })
export const getMovieByName = (title: string) => MovieModel.findOne({ title: title })
export const getMovieById = (id: string) => MovieModel.findById({ _id: id })
export const createMovie = (values: Record<string, any>) => new MovieModel(values).save().then(movie => movie.toObject())
export const updateMovieById = (id: string, values: Record<string, any>) => MovieModel.findByIdAndUpdate({ _id: id }, values)
export const deleteMovieById = (id: string) => MovieModel.findByIdAndDelete({ _id: id })