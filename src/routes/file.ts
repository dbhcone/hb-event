import { AxiosResponse } from 'axios';
import express, { Request, response, Response } from 'express';
import { getFileCount } from '../controllers/file.controller';
import { fileCount } from '../services/api.external';

const router = express.Router();

router.post('/file_count', getFileCount )

export {router as fileRouter}