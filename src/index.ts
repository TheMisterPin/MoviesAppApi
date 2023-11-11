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