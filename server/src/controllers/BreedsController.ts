import random from 'random';
import randomName from 'random-name';
import randomBreed from 'dog-breeds';
import Dog from '../models/Dog';
import { Request, Response } from 'express';

const createDog = async (req: Request, res: Response) => {
  try {
    const breed: Breed = randomBreed.random();
    const doggie: Doggie = {
      name: randomName.first(),
      age: random.int(1, 100),
      breed: breed.name
    };
    await Dog.create(doggie);
    return res.status(200).json({
      success: true,
      message: 'created a dag',
      dogs: await Dog.findAll({ raw: true, order: [['id', 'asc']] }),
      dog: doggie
    });
  } catch (err) {
    console.log(err, 'error creating a new dag');
  }
};

const deleteDags = async (req: Request, res: Response) => {
  try {
    console.log('deleting all dogs from the database..');
    await Dog.destroy({
      where: {},
      truncate: true
    });
    return res.status(200).json({
      success: true,
      message: 'deleted all dags from database',
      dogs: await Dog.findAll({ raw: true, order: [['id', 'asc']] })
    });
  } catch (err) {
    console.log(err, 'error occurred deleting dags');
  }
};

const deleteSingleDag = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    console.log('deleting a single dag from the database...');
    await Dog.destroy({
      where: {
        id
      }
    });
    return res.status(200).json({
      success: true,
      message: `deleted daggie at id ${id}`,
      dogs: await Dog.findAll({ raw: true, order: [['id', 'asc']] })
    });
  } catch (err) {
    console.log(err);
  }
};

const getDags = async (req: Request, res: Response) => {
  try {
    const dogs = await Dog.findAll({
      // limit: 5,
      raw: true,
      order: [['id', 'ASC']]
    });
    console.log('dogs: ', dogs);
    return res.status(200).json({
      success: true,
      message: 'retrieved dags',
      dogs: dogs
    });
  } catch (err) {
    console.log(err);
  }
};

export { getDags, deleteDags, deleteSingleDag, createDog };
