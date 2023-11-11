import mongoose from "mongoose";
import { Document, model, Schema } from 'mongoose';


interface IUserDocument extends Document {
    username: string,
    email: string,
    password: string,
    movies: mongoose.Types.ObjectId[],
    createdAt: Date,
    updatedAt: Date,
}
const UserSchema = new Schema<IUserDocument>({
    password: { type: String, required: true },    
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movies' }],
}, { timestamps: true, versionKey: false })


const UserModel = model("User", UserSchema)
export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken })
export const getUserById = (id: string) => UserModel.findById(id).populate("movies")
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then(user => user.toObject())
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ _id: id })

export default UserModel