import express from 'express';
import {
  getItems,
  getItemsByInstrumentName,
  getItemsByAvailability,
} from '../controllers/itemControllers';

const itemRouter = express.Router();

itemRouter.get('/', getItems);

itemRouter.get('/:instrumentName', getItemsByInstrumentName);

itemRouter.get('/isAvailable/:value', getItemsByAvailability);

export default itemRouter;
