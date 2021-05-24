import pg from 'pg';
import path from 'path';
import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
import random from 'random';
import randomName from 'random-name';
import Dog from './models/Dog';
require('dotenv').config();

// db
const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_USER,
    port: 5432,
    dialect: 'postgres',
    logging: true
  }
);

// express
const app = express();
const port: number = 3000;

app.use('/', express.static(path.join(__dirname, '../../frontend/dist')));

const createTestTable = async () => {
  try {
    console.log('try and create table..');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS beans (
        id  SERIAL  PRIMARY KEY NOT NULL,
        name  TEXT  NOT NULL
      )
    `);
  } catch (err) {
    console.log('error creating table thru sequelize');
  }
};

const getDogs = async () => {
  try {
    console.log('try getting dogs..');
    await Dog.create({ name: randomName.first(), age: random.int(1, 100) });
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
    await getDogs();
    await createTestTable();
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
