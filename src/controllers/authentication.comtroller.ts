import express from 'express'
import { getUserByEmail } from "./users.controller";
import prisma from '../../db/client';




export const login = async (req: express.Request, res: express.Response)=> {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const logout = async (req: express.Request, res: express.Response) => {
    try {
       
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const register = async (req: express.Request, res: express.Response) => {
const { email, username, password } = req.body   
 try {
        
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = await prisma.user.create({data: {
            email,
            username,
            password,
       } })
        return res.status(201).json({ message:user }).end()

    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

