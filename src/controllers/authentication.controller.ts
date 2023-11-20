import express from 'express'
import prisma from '../../db/client'
import { generateUsername } from '../helpers/generateUsername'





export const createUser = async (req: express.Request, res: express.Response) => {
	try {
		const { email} = req.body


		if (!email) {
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const userExists = await prisma.user.findUnique({ where: { email: email } })
		if (userExists) {
			return res.status(409).json({ message: 'Email already in use' })
		}
		const username = generateUsername()
		const newUser = await prisma.user.create({ data: { username, email } })
		return res.status(201).json(newUser)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}



export const loginAuth0 = async (req: express.Request, res: express.Response) => {
	try {
		const { email } = req.body
		if (!email) {
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const user = await prisma.user.findUnique({ where: { email: email } })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		

		return res.status(200).json({ message: 'Logged in!' })
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}




export const updateUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		const { username, email } = req.body
		const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		const updatedUser = await prisma.user.update({
			where: { id: parseInt(id) },
			data: {
				username: username || user.username,
				email: email || user.email,
			}
		})
		return res.status(200).json(updatedUser)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}
export const updateUserByName = async (req: express.Request, res: express.Response) => {
	try {
		const { user } = req.params		
		const {  username, email } = req.body
		const existingUser = await prisma.user.findUnique({ where: { username: user } })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		const updatedUser = await prisma.user.update({
			where: { username: user },
			data: {
				username: username || existingUser.username,
				email: email || existingUser.email,
			}
		})
		return res.status(200).json(updatedUser)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
	try {
		const { email } = req.body
		if (!email) {
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const user = await prisma.user.findUnique({ where: { email: email } })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		const deletedUser = await prisma.user.delete({ where: { email: email } })
		return res.status(200).json(deletedUser)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}
