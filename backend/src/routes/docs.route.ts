import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

const router = Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
