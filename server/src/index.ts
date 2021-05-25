require('dotenv').config();
import path from 'path';
import express from 'express';
import random from 'random';
import randomName from 'random-name';
import randomBreed from 'dog-breeds';
import Dog from './models/Dog';
import { sequelize } from './db';

const app = express();
const port: number = 3000;

app.use('/', express.static(path.join(__dirname, '../../frontend/dist')));

const createTestTable = async () => {
  try {
    // console.log('try and drop tables..');
    // await sequelize.query(`
    //   DROP TABLE IF EXISTS dogs
    // `);
    console.log('try and create table..');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS dogs (
        id  SERIAL  PRIMARY KEY NOT NULL,
        name  TEXT  NOT NULL,
        age  INTEGER  NOT NULL,
        breed  TEXT
      )
    `);
  } catch (err) {
    console.log('error creating table thru sequelize');
  }
};

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
      raw: true,
      limit: 5,
      order: [['name', 'ASC']]
    });
    console.log('dogs: ', dogs);
  } catch (err) {
    console.log(err, 'error in findAll() query method');
  }
};

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to db, running on port ${port}`);
    await createTestTable();
    await getDogs();
  } catch (err) {
    console.log(err, 'trying connection again...');
    setTimeout(connectDB, 2000);
  }
};

app.listen(port, async () => {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
  }
});
