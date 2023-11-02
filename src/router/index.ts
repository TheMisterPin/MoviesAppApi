import express from 'express';
import autenthication from './autenthication';
const router = express.Router()

export default (): express.Router => {
    autenthication(router);
    return router;
}