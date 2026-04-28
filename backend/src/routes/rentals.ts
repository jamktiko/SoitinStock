import express from 'express';
const rentalRouter = express.Router();

rentalRouter.get('/', (req, res) => {
  res.send('list of rentals');
});

export default rentalRouter;
