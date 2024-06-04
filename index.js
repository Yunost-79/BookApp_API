import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import configureRoutes from './router/router.js';

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use('/api', configureRoutes());

const startApp = async () => {
  try {
    console.log('connecting to db...');
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server listens on: http://localhost:${PORT}/api`));
  } catch (err) {
    console.error(err);
  }
};

startApp();
