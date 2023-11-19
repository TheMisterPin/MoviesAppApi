import express from 'express'
import prisma from '../../../db/client'

export const getAllGenres = async (req: express.Request, res: express.Response) => {
	try {
		const genres = await prisma.genre.findMany()
		return res.status(200).json(genres)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}

export const deleteGenre = async (req: express.Request, res: express.Response) => {

	try {
		const deletedGenre = await prisma.genre.delete({ where: { id: parseInt(req.params.id) } })
		if (!deletedGenre) {
			return res.status(404).json({ message: 'Genre not found' })
		}
		return res.status(200).json(deletedGenre)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}

export const uploadGenre = async (req: express.Request, res: express.Response) => {
	try {
		const { genre, image } = req.body
		if (!genre || !image) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const existingGenre = await prisma.genre.findUnique({ where: { genre } })
		if (existingGenre) {
			return res.status(409).json({ message: 'Genre already exists' })
		}

		const newGenre = await prisma.genre.create({ data: { genre, image } })




		return res.status(201).json(newGenre)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

export const updateGenreByName = async (req: express.Request, res: express.Response) => {
	try {
		const { genre: genreParam } = req.params
		const updateData = req.body

		if (!genreParam) {
			return res.status(400).json({ message: 'Missing required genre parameter' })
		}

		const updatedGenre = await prisma.genre.update({ where: { genre: genreParam }, data: updateData })
		return res.status(200).json(updatedGenre)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}