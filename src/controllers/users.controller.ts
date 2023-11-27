import express from 'express'
import prisma from '../../db/client'



export interface User {
	id?: number;
	email: string;
	username: string;
	createdAt?: Date;
	updatedAt?: Date;
	password?: string;
	authentication?: {
		salt: string;
		password: string;
		sessionToken?: string;
	};
}
export const getAllUsers = async (req: express.Request, res: express.Response) => {
	try {
		const users = await prisma.user.findMany({select: {username: true, id: true}})
		return res.status(200).json(users)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}

}

export const deleteUser = async (req: express.Request, res: express.Response) => {
	const  id = req.params.id
	try {
		const deletedUser = await prisma.user.delete({
			where: { id : parseInt(id)  },
			select: { username: true} 
		})
		return res.status(200).json(deletedUser)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}
export const deleteUserByName = async (req: express.Request, res: express.Response) => {
	const { username }= req.params
	try {
		const deletedUser = await prisma.user.delete({
			where: { username: username  },
			select: { username: true} 
		})
		return res.status(200).json(deletedUser)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}

export const getUserByEmail = async (req: express.Request, res: express.Response) => {
	const {email} = req.params
	try {
		const user = await prisma.user.findUnique({ where: { email }, select: { id : true, username: true} })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })}		
		return res.status(200).json(user)
	} catch (error) {
		console.error('Error in findUserByEmail:', error)	
	}
}
export const getUserById = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		if (!id) {
			return res.status(400).json({ message: 'Missing id' })
		}
		const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) }, include: { uploadedMovies:true}})
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' })
	}

}
export const getUserByUsername = async (req: express.Request, res: express.Response) => {
	try {
		const { username } = req.params
		if (!username) {
			return res.status(400).json({ message: 'Missing Username' })
		}
		const user = await prisma.user.findUnique({ where: { username }, include: { uploadedMovies:true}})
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' })
	}

}
export const getUserMovies = async (req: express.Request, res: express.Response) => {
	try {
		const { username } = req.params
		if (!username) {
			return res.status(400).json({ message: 'Missing Username' })
		}
		const user = await prisma.user.findUnique({ where: { username }, select:{uploadedMovies:true}})
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' })
	}

}
export const getUserMoviesById = async (req: express.Request, res: express.Response) => {
	try {
		const {id } = req.params
		if (!id) {
			return res.status(400).json({ message: 'Missingid' })
		}
		const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) }, select: { uploadedMovies:true}})
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' })
	}

}



