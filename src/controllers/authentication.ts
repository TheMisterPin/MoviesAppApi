import express from 'express'
import { createUser, getUserByEmail } from '../db/users'
import { random } from '../helpers'
import { authentication } from '../helpers/index';




export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
    const existingUser = await getUserByEmail(email)
    
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }

    const salt = random()
    const user = await createUser({
        email,
        username,
        authentication: {
            salt, 
            password: authentication(salt, password)
        }
    })
return res.status(200).json({ message: 'User created successfully' }).end()

    }
        catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
}