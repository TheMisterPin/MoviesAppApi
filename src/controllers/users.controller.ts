import express from 'express';
import prisma from "../../db/client";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: req.params.id }
        });
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
//todo only send changed fields 
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { username }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};




export const getUserByEmail = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ message: 'Missing email' });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    
        

    }
}


export const getUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing id' });
        }
        const user = await prisma.user.findUnique({ where: { id }, include:{movies:true}});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }

}
export const getUserByUsername = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ message: 'Missing Username' });
        }
        const user = await prisma.user.findUnique({ where: { username }, include:{movies:true}});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }

}



