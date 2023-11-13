import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
require('dotenv').config();

const app = express();

app.use(cors({ credentials : true }));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(2323, () => {
    console.log('Server is running on port 2323');
});


app.use('/', router()); 


const { auth } = require('express-oauth2-jwt-bearer');


const jwtCheck = auth({
  audience: 'http://localhost:2323',
  issuerBaseURL: 'https://dev-7esko0bv6fmmtrd5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});


app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});
