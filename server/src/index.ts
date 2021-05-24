import pg from 'pg';
import path from 'path';
import express from 'express';
require('dotenv').config();

// db
const postgresCreds = {
  user: process.env.PGSQL_USER,
  host: process.env.PGSQL_USER,
  database: process.env.PGSQL_DB,
  password: process.env.PGSQL_PASSWORD,
  port: process.env.PGSQL_PORT
};

// express
const app = express();
const port: number = 3000;

app.use('/', express.static(path.join(__dirname, '../../frontend/dist')));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
  console.log(postgresCreds);
});
