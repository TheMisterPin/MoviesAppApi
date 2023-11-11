import express from 'express'
import { getUserByEmail, getUserBySessionToken } from '../models/users.model'
import { random } from '../helpers'
import { authentication } from '../helpers/index';
import  UserModel  from '../models/users.model';




export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication')
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        // const encryptedPassword = authentication(user.authentication.salt, password)
        // if (authentication(user.authentication.salt, password) !== encryptedPassword) {
        //     return res.status(403).json({ message: 'Invalid password' })
        // }
        // const salt = random()
        // user.authentication.sessionToken = authentication(salt, user._id.toString())
        // await user.save()
        // res.cookie('USER-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })
        return res.status(200).json({ message: 'Login successful' })
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}


export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const { sessionToken } = req.cookies; 
        if (!sessionToken) {
            return res.status(400).json({ message: 'No session to terminate' });
        }

        
        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            return res.status(400).json({ message: 'Invalid session token' });
        }

     
        // user.authentication.sessionToken = null;
        // await user.save();

   
        res.clearCookie('USER-AUTH', { domain: 'localhost', path: '/' });

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

        const salt = random()
        const user = await UserModel.create({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(201).json({ message: 'User created successfully' }).end()

    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

