import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';


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

server.listen(2323, () => {
    console.log('Server is running on port 2323');
});

const MONGO_URL = 'mongodb+srv://TheMisterPin:Veleta22@cluster0.wtlilfh.mongodb.net/'
// const MONGO_URL = 'mongodb://localhost:27017/test'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router() )