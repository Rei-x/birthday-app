import express from 'express';
import morgan from 'morgan';
import { isAuthed } from './middlewares';
import { userRoute } from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

app.use('/api', userRoute);

app.get('/', (req, res) => {
  res.json({ hello: 'world', locals: res.locals });
});

app.get('/isLogged', isAuthed, (req, res) => {
  res.json({ user: res.locals.user });
});

app.use((req, res) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

export default app;
