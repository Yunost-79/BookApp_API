import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

import configureRoutes from './router/router.ts';

dotenv.config();

const PORT: string = process.env.PORT!;
const DB_URL: string = process.env.DB_URL!;

const app = express();

app.use(express.json());
app.use('/api', configureRoutes());

const startApp = async () => {
  try {
    console.log('connecting to db...');
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log(`Server listens on: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error(err);
  }
};

startApp();
