import express from 'express'
const namespace = 'https://Moviehub.dev/'
import { Movies } from '@prisma/client'

//for auth0 token details extraction, does not work, ideas? 


declare module 'express-serve-static-core' {
    interface Request {
		email?: string;
		username?: string;
		authentication: {
			salt: string;
			password: string;
			sessionToken?: string;
		};
		user?:  [key: string];
        customClaims?: {
            moviesUploaded: Movies[];
            watchList: Movies[];
            username: string;
            password: string;
            profilePicture: string;
        };
    }
}

export const extractTokenMiddleware = (request: express.Request, response :express.Response, next: express.NextFunction) => {
	if (!request.user) {
		return response.status(401).json({ message: 'Missing or invalid token' })
	}

	

	request.customClaims = {
		moviesUploaded: request.user[`${namespace}movies_uploaded`],
		watchList: request.user[`${namespace}watch_list`],
		username: request.user[`${namespace}username`],
		password: request.user[`${namespace}password`],
		profilePicture: request.user[`${namespace}profile_picture`]
	}

	next()
}

