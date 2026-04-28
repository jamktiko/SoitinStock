import express from 'express';
const instrumentRouter = express.Router();

instrumentRouter.get('/', (req, res) => {
  res.send('list of instruments');
});

instrumentRouter.get('/:id', (req, res) => {
  req.params.id;
  res.send('Get instrument with ID' + req.params.id);
});

export default instrumentRouter;
