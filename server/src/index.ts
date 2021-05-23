import express from 'express';

const app = express();
const port: number = 3000;

app.get('/', (_, res) => {
  res
    .status(200)
    .send('<div>Express with Typescript on Docker container</div>');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
