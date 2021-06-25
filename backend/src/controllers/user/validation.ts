import { body } from 'express-validator';

const validator = body('login').isString().isLength({ min: 3 });

export default validator;
