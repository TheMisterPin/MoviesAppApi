import mongoose from "mongoose";
import { authentication } from '../helpers/index';
// interface UserInterface extends mongoose.Document{
//     username: string;
//     email: string;
//     movies: string[];
//     createdAt: Date;
//     updatedAt: Date;
//     authentication: any
// }

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}],
    authentication : {
        password: {type: String, required: true, select: false},
        salt : {type: String, select: false},
        sessionToken : {type: String, select: false}
    }} ,{timestamps: true, versionKey: false})

export const UserModel = mongoose.model('Users', UserSchema)
export const getUsers= () => UserModel.find()
export const getUserByEmail= (email: string) => UserModel.findOne({email})
export const getUserBySessionToken= (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken})
export const getUserById= (id: string) => UserModel.findById(id).populate("movies")
export const createUser= (values: Record<string, any>) => new UserModel(values).save() .then(user => user.toObject())
export const updateUserById= (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)
export const deleteUserById= (id: string) => UserModel.findByIdAndDelete({_id: id})
