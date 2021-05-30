import random from 'random';
import randomName from 'random-name';
import randomBreed from 'dog-breeds';
import Dog from '../models/Dog';
import { Request, Response } from 'express';

const getDogs = async () => {
  try {
    console.log('try getting dogs..');
    const breed: Breed = randomBreed.random();
    const doggie: Doggie = {
      name: randomName.first(),
      age: random.int(1, 100),
      breed: breed.name
    };
    await Dog.create(doggie);
    const dogs = await Dog.findAll({
      // limit: 5,
      raw: true,
      order: [['id', 'ASC']]
    });
    console.log('dogs: ', dogs);
    return dogs;
  } catch (err) {
    console.log(err, 'error in findAll() query method');
  }
};

const getDags = async (req: Request, res: Response) => {
  try {
    const dogs = await getDogs();
    return res.status(200).json({
      success: true,
      message: 'retrieved dags',
      dogs: dogs
    });
  } catch (err) {
    console.log(err);
  }
};

export { getDags };
