import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { isAuthed } from './middlewares';
import { userRoute } from './routes';
import config from './config';

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Osiemnastka Barka',
      description: 'My custom api',
      contact: {
        name: 'Lary Junior',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
    host: 'http://localhost:3000',
    servers: [{ url: 'http://localhost:3000/api' }],
    basePath: '/api',
    produces: ['application/json'],
    consumes: ['application/json'],
  },
  apis: ['src/app.ts', 'src/routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use('/api', userRoute);

/**
 * @swagger
 * /:
 *  get:
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    description: Returns hello world
 *    responses:
 *      '200':
 *        description: Everything works
 */
app.get('/', (_req, res) => {
  res.json({ hello: 'world', locals: res.locals });
});

/**
 * @swagger
 * /isLogged:
 *  get:
 *    description: Return json if user is logged
 *    security:
 *      - bearerAuth: [isLogged]
 *    responses:
 *      '200':
 *        description: You are authenticated
 *      '401':
 *        description: You are not authenticated
 */
app.get('/isLogged', isAuthed, (_req, res) => {
  res.json({ user: res.locals.user });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((_req, res) => {
  const error = new Error('Not found');

  return res.status(404).json({
    message: error.message,
  });
});

export default app;
