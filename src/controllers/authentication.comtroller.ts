import express from 'express'



import  UserModel  from '../models/users.model';




export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new UserModel({ email, username, password });
        await user.save();
        if (!user) {
            return res.status(500).json({ message: 'User Creation Failed' });
        }

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await UserModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export const logout = async (req: express.Request, res: express.Response) => {
    try {
        // Implement session/token invalidation logic here if needed

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};