import express from 'express';
import {
  getItems,
  getItemsByInstrumentName,
} from '../controllers/itemControllers';

const itemRouter = express.Router();

itemRouter.get('/', getItems);

itemRouter.get('/:instrumentName', getItemsByInstrumentName);

export default itemRouter;
