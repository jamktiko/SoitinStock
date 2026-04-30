import express from 'express';
import { getInstruments } from '../controllers/instrumentController';

const instrumentRouter = express.Router();

/*

We want to see all instrument types

*/
instrumentRouter.get('/', getInstruments);

//this is just a test
// instrumentRouter.get('/', (req, res) => {
//   res.send('list of instruments');
// });

instrumentRouter.get('/:id', (req, res) => {
  req.params.id;
  res.send('Get instrument with ID' + req.params.id);
});
//test end

export default instrumentRouter;
