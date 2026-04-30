import { Router } from 'express';
import { testQuery } from '../controllers/test';

const testrouter = Router();

testrouter.get('/', testQuery);

export default testrouter;
