import express from 'express';


import { getUsers, deleteUserById, updateUserById } from '../db/users';

export const getAllUsers =async (req : express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users)
    } catch (error) {
    res.status(400)
    }

}

export const deleteUser =async (req : express.Request, res: express.Response) => {
    try {
        const deletedUser = await deleteUserById(req.params.id);
        return res.status(200).json(deletedUser)
    } catch (error) {
    res.status(400)
    }

}

export const updateUser =async (req : express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const {username} = req.body
        if (!username) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const user = await updateUserById(id, username)
        await user.save();
        return res.status(200).json(user)
        
    } catch (error) {
        res.status(400)
    }}