import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
require('dotenv').config();

const app = express();

app.use(cors(
    {
        credentials : true,
    }
));


app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());

const server = http.createServer(app);

const PORT = process.env.PORT || 2323;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const MONGO_URL = process.env.MONGO_URL


mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router() )