import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectToDatabase } from './db';
import config from './config';
import {
  tokenRoute,
  docsRoute,
  userRoute,
  videoRoute,
  adminRoute,
  pinRoute,
} from './routes';

if (process.env.NODE_ENV !== 'test') {
  connectToDatabase(config.DB_URL);
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: config.ORIGIN,
  })
);

app.use('/api', [tokenRoute, userRoute, videoRoute, adminRoute, pinRoute]);

app.use('/docs', docsRoute);

app.use((_req, res) => {
  const error = new Error('Not found');

  return res.status(404).json({
    message: error.message,
  });
});

export default app;
