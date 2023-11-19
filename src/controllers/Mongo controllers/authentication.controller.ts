import express from 'express'
import { getUserByEmail } from './users.controller'








export const protectedRequest = async (req: express.Request, res: express.Response) => {
	res.send({message: 'Protected Request'})
}



export const login = async (req: express.Request, res: express.Response)=> {
	try {
		const { email, password } = req.body
        
		if (!email || !password) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const user = await getUserByEmail(email)
		if (!user) {
			return res.status(400).json({ message: 'User Not Found' })
		}

        

        

		return res.status(200).json({ message: 'Login successful' })
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}


export const logout = async (req: express.Request, res: express.Response) => {
	try {
       
		return res.status(200).json({ message: 'Logout successful' })
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}




// export const handleIncomingToken = async (req: express.Request, res: express.Response) => {
//     const { email, username, movies } = req.body;
//     const id = req.id;
//     if (!email) {
//         return res.status(400).json({ message: 'Email is required' });
//     }

//     try {
   
//         let user = await prisma.user.findUnique({ where: { email } });

//         if (user) {
//             user = await prisma.user.update({
//                 where: { email, id  },
//                 data: { username, movies, userId  },
//             });
//         } else {
//             user = await prisma.user.create({
//                 data: { email, username, movies, userId },
//             });
//         }

//         return res.status(200).json(user);
//     } catch (error) {
//         console.error('Error in handleIncomingToken:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };