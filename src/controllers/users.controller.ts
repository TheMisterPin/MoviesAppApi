import express from 'express';
import UserModel, { getUsers, deleteUserById, updateUserById } from '../models/users.model';

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

    export const bulkRegisterUsers = async (req: express.Request, res: express.Response) => {
        try {
            const users = req.body;
            if (!Array.isArray(users) || users.length === 0) {
                return res.status(400).json({ message: 'No users provided for registration' });
            }
    
            const registeredUsers = [];
            for (const { email, username, password } of users) {
                if (!email || !username || !password) {
                    continue; 
                }
   
                const existingUser = await UserModel.findOne({ email });
                if (existingUser) {
                    continue; 
                }
    
                const newUser = new UserModel({ email, username, password });
                await newUser.save();
                registeredUsers.push(newUser);
            }
    
            return res.status(201).json(registeredUsers);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };