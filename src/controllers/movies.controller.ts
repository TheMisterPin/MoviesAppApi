import express from 'express'
import prisma from '../../db/client'


export const uploadMovie = async (req: express.Request, res: express.Response) => {
	try {
		const { title, description, poster, genre, length, rating, votes, trailer, year } = req.body
		const { userId } = req.params
		if (!userId) {
			return res.status(400).json({ message: 'Id Not Found' })
		}
		if (!title || !description || !poster || !genre || !length || !rating || !trailer || !year || !votes) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const existingMovie = await prisma.movies.findUnique({ where: { title } })
		if (existingMovie) {
			return res.status(409).json({ message: 'Movie already exists' })
		}

		const genreRecord = await prisma.genre.findUnique({ where: { genre } })


		const newMovie = await prisma.movies.create({
			data: {
				title,
				description,
				poster,
				length: parseInt(length),
				votes: parseInt(votes),
				rating: parseFloat(rating),
				trailer,
				year: parseInt(year),
				creator: { connect: { id: parseInt(userId) } },
				genre: { connect: { genre: genre } }
			}
		})

		await prisma.user.update({
			where: { id: parseInt(userId) },
			data: { uploadedMovies: { connect: { id: newMovie.id } } }
		})

		await prisma.genre.update({
			where: { genre: genreRecord.genre },
			data: { movies: { connect: { id: newMovie.id } } }
		})

		return res.status(201).json(newMovie)

	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

export const getAllMovies = async (req: express.Request, res: express.Response) => {
	try {
		const movies = await prisma.movies.findMany({
			select: {
				id: true,
				title: true,
				genreName: true,
				poster: true,
				rating: true,
				length: true,
				year: true
			}
		})
		if (!movies) {
			return res.status(404).json({ message: 'No movies found' })
		}

		return res.status(200).json(movies)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}

export const getMovieByTitle = async (req: express.Request, res: express.Response) => {
	try {
		const title = req.params.title
		if (!title) {
			return res.status(400).json({ message: 'Title Not Found' })
		}
		const movie = await prisma.movies.findUnique({
			where: { title }, select: {
				
				title: true,
				description: true,
				length: true,
				poster: true,
				genreName: true,
				rating: true,
				votes: true,
				trailer: true,
				year: true,
				creator: {
					select: {
						username:true
					}},
				createdAt: false,
				updatedAt: false,
				creatorId: false,
			}
		})
		if (!movie) {
			return res.status(404).json({ message: 'Movie not found' })
		}
		return res.json(movie)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}
export const getMovieById = async (req: express.Request, res: express.Response) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: 'Id Not Found' })
		}
		const movie = await prisma.movies.findUnique({
			where: { id: parseInt(id) }, select: {
				title: true,
				description: true,
				length: true,
				poster: true,
				genreName: true,
				rating: true,
				votes: true,
				trailer: true,
				year: true,
				creator: {
					select: {
						username: true
					}
				},
				createdAt: false,
				updatedAt: false,
				creatorId: false,
			}})
		if (!movie) {
			return res.status(404).json({ message: 'Movie not found' })
		}
		return res.json(movie)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}
export const getMovieByGenre = async (req: express.Request, res: express.Response) => {
	try {
		const genreParams = req.params.genre

		if (!genreParams) {
			return res.status(400).json({ message: 'Genre not provided' })
		}

		const genre = await prisma.genre.findUnique({ where: { genre: genreParams } })
		if (!genre) {
			return res.status(404).json({ message: 'Genre not found' })
		}

		const movies = await prisma.movies.findMany({ where: { genreName: genre.genre }, select: { id: true, title: true } })
		if (movies.length === 0) {
			return res.status(404).json({ message: 'No movies found for this genre' })
		}

		return res.json(movies)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

export const deleteMovie = async (req: express.Request, res: express.Response) => {
	const id = req.params.id
	try {
		const deletedMovie = await prisma.movies.delete({ where: { id: parseInt(id) } })
		if (!deletedMovie) {
			return res.status(404).json({ message: 'Movie not found' })
		}
		return res.status(200).json(deletedMovie)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}
export const deleteMovieByTitle = async (req: express.Request, res: express.Response) => {
	try {
		const deletedMovie = await prisma.movies.delete({ where: { title: req.params.title } })
		if (!deletedMovie) {
			return res.status(404).json({ message: 'Movie not found' })
		}
		return res.status(200).json(deletedMovie)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}

export const updateMovie = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		if (!id) {
			return res.status(400).json({ message: 'Missing Id' })
		}
		const updateData = req.body
		if (!updateData.title) {
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const updatedMovie = await prisma.movies.update({ where: { id: parseInt(id) }, data: updateData })
		return res.status(200).json(updatedMovie)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}
export const updateMovieByTitle = async (req: express.Request, res: express.Response) => {
	try {
		const { title } = req.params
		const formattedTitle = decodeURIComponent(title)
		if (!title) {
			return res.status(400).json({ message: 'Missing title' })
		}
		const updateData = req.body
		if (!updateData.title) {
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const updatedMovie = await prisma.movies.update({ where: { title: formattedTitle }, data: updateData })
		return res.status(200).json(updatedMovie)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
}



export const uploadAuth0Movie = async (req: express.Request, res: express.Response) => {
	try {
		const { title, description, poster, genre, length, rating, votes, trailer, year, } = req.body
		const { username } = req.params
		console.log(username)
		if (!username) {
			
			return res.status(400).json({ message: 'userName Not Found' })
		}
		if (!title || !description || !poster || !genre || !length || !rating || !trailer || !year || !votes) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const existingMovie = await prisma.movies.findUnique({ where: { title } })
		if (existingMovie) {
			return res.status(409).json({ message: 'Movie already exists' })
		}

		const genreRecord = await prisma.genre.findUnique({ where: { genre } })


		const newMovie = await prisma.movies.create({
			data: {
				title,
				description,
				poster,
				length: parseInt(length),
				votes: parseInt(votes),
				rating: parseFloat(rating),
				trailer,
				year: parseInt(year),
				creator: { connect: { username: username } },
				genre: { connect: { genre: genre } }
			}
		})

		await prisma.user.update({
			where: { username: username },
			data: { uploadedMovies: { connect: { id: newMovie.id } } }
		})

		await prisma.genre.update({
			where: { genre: genreRecord.genre },
			data: { movies: { connect: { id: newMovie.id } } }
		})

		return res.status(201).json(newMovie)

	} catch (error) {
		return res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}
