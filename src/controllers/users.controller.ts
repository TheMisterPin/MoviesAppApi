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


export const getUsers = () => prisma.user.findMany();

export const getUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });


export const getUserById = (id: string) => prisma.user.findUnique({
    where: { id },
    include: { movies: true }
});
export const getUserByUsername = (username: string) => prisma.user.findUnique({
    where: { username },
    include: { movies: true }
});


