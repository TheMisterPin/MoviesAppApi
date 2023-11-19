import express from 'express'
import prisma from '../../db/client'

export interface User {
    email: string;
    username: string;
    password: string;
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
	try {
		const users = await prisma.user.findMany()
		return res.status(200).json(users)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}

}

export const deleteUser = async (req: express.Request, res: express.Response) => {
	const  id = req.params.id
	try {
		const deletedUser = await prisma.user.delete({
			where: { id : parseInt(id) }
		})
		return res.status(200).json(deletedUser)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}

export const updateUser = async (req: express.Request, res: express.Response) => {
	try {
      
		const { username} = req.body

		if (!username  ) {
			return res.status(400).json({ message: 'Missing userName! you had one field!' })
		}

		const updatedUser = await prisma.user.update({
			where: { id: parseInt(req.params.id) },
			data: { username }
		})

		return res.status(200).json(updatedUser)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}


export const getUserByEmail = async (email: string) => {
	try {
		return await prisma.user.findUnique({ where: { email } })
	} catch (error) {
		console.error('Error in findUserByEmail:', error)
		throw error
	}
}

export const getUserById = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		if (!id) {
			return res.status(400).json({ message: 'Missing id' })
		}
		const user = await prisma.user.findUnique({ where: { id:parseInt(req.params.id) }, include:{Movies:true}})
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
		const user = await prisma.user.findUnique({ where: { username }, include:{Movies:true}})
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' })
	}

}



