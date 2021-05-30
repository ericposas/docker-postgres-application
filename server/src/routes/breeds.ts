import express from 'express';
import {
  getDags,
  deleteDags,
  createDog
} from '../controllers/BreedsController';

const breedsRouter = express.Router();

breedsRouter.get('/', getDags);
breedsRouter.delete('/', deleteDags);
breedsRouter.post('/', createDog);

export default breedsRouter;
