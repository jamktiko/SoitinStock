import express from 'express';
import {
  getInstruments,
  getInstrumentsByType,
} from '../controllers/instrumentController';

const instrumentRouter = express.Router();

instrumentRouter.get('/', getInstruments);

instrumentRouter.get('/:type', getInstrumentsByType);

export default instrumentRouter;
