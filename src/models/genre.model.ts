import {Document, model, Schema} from 'mongoose';


interface GendreInterface extends Document{
    genre: string,
    image: string,
    movies:[],
    createdAt: Date,
    updatedAt: Date

}


const GenreSchema = new Schema<GendreInterface>({
    genre: {type: String , required: true, unique: true},
    image: {type: String , required: true,},
    movies: {
        type: [{type: Schema.Types.ObjectId, ref: 'Movies'}],
    }

}, {timestamps: true, versionKey: false})

export const GenreModel = model<GendreInterface>('Genres', GenreSchema)
export const getGenres= () => GenreModel.find()
export const getGenreByName= (genre: string) => GenreModel.findOne({genre})
export const getGenreById= (id: string) => GenreModel.findById({_id: id})
export const createGenre = (values: Record<string, any>) => {
  
    return new GenreModel(values).save()
      .then(genre => genre.toObject());
  }
  
export const deleteGenreById= (id: string) => GenreModel.findByIdAndDelete({_id: id})
export const updateGenreById= (id: string, values: Record<string, any>) => GenreModel.findByIdAndUpdate({_id: id}, values)


