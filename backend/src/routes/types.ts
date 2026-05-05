import exporess from 'express';
import { getTypes } from '../controllers/typeController';

const typeRouter = exporess.Router();

typeRouter.get('/', getTypes);

export default typeRouter;
