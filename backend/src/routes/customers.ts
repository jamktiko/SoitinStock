import express from 'express';
const customerRouter = express.Router();
import customerController from '../controllers/customerController';

customerRouter.get('/', customerController.findAll);

export default customerRouter;
