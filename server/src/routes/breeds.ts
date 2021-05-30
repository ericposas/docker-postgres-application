import express from 'express';
import { getDags } from '../controllers/BreedsController';

const breedsRouter = express.Router();

breedsRouter.get('/', getDags);

export default breedsRouter;
