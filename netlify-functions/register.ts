import { createUser, getUserByEmail } from '../src/db/users';
import { random, authentication } from '../src/helpers';

exports.handler = async function(event, context) {
   
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { email, username, password } = JSON.parse(event.body);

    if (!email || !username || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing required fields' }),
        };
    }

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'User already exists' }),
            };
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User created successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
