import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectToDatabase } from './db';
import config from './config';
import routes from './routes';

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

app.use('/api', routes.api);

app.use('/docs', routes.docs);

app.use((_req, res) => {
  const error = new Error('Not found');

  return res.status(404).json({
    message: error.message,
  });
});

export default app;
