import express from 'express';
import {
  getDags,
  deleteDags,
  createDog,
  deleteSingleDag
} from '../controllers/BreedsController';

const breedsRouter = express.Router();

breedsRouter.get('/', getDags);
breedsRouter.delete('/', deleteDags);
breedsRouter.delete('/:id', deleteSingleDag);
breedsRouter.post('/', createDog);

export default breedsRouter;
