require('dotenv').config();
import path from 'path';
import express from 'express';
import cors from 'cors';
import { sequelize } from './db';
import breedsRouter from './routes/breeds';

const app = express();
const apiBase = '/api/v1';
const port: number = process.env.API_PORT as unknown as number;

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../../frontend/dist')));
app.use(`${apiBase}/breeds`, breedsRouter);

const createTestTable = async () => {
  try {
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

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to db, running on port ${port}`);
    await createTestTable();
    // await getDogs();
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
