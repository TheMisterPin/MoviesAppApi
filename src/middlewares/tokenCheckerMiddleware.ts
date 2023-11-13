import {auth} from 'express-oauth2-jwt-bearer'


export const tokenCheckerMiddleware = auth({
    audience: "http://localhost:2323" ,
    issuerBaseURL:"https://dev-7esko0bv6fmmtrd5.us.auth0.com" ,
});



