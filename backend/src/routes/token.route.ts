import { Router } from 'express';
import { tokenController } from '../controllers';
import { isAuthed } from '../middlewares';

const router = Router();

/**
 * @swagger
 * /redeemToken:
 *  post:
 *    produces:
 *    - application/json
 *    consumes:
 *    - application/json
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User ID"
 *      schema:
 *        type: object
 *        properties:
 *          userId:
 *              type: string
 *              description: User ID
 *              example: 23534534634523
 *      required: true
 *    responses:
 *      200:
 *        description: Token that you can redeem for JWT Token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: Token that you can redeem for JWT Token
 *                  example: 543534512353049
 *
 */
router.post('/redeemToken', isAuthed('admin'), tokenController.post);
/**
 * @swagger
 * /redeemToken/{token}:
 *  get:
 *    consumes:
 *    - application/json
 *    parameters:
 *    - in: path
 *      name: token
 *      description: "Token"
 *      schema:
 *        type: string
 *      required: true
 *    responses:
 *      200:
 *        description: JWT Token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                JWT:
 *                  type: string
 *                  description: JWT Token
 *                  example: 543534512353049
 *
 */
router.get('/redeemToken/:tokenId', tokenController.get);

export default router;
