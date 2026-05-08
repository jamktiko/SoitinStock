import express from 'express';
const rentalRouter = express.Router();
import rentalController from '../controllers/rentalController';

// rentalRouter.get('/', (req, res) => {
//   res.send('list of rentals');
// });

rentalRouter.get('/all', rentalController.findAll);

rentalRouter.get('/customer/:email', rentalController.findByEmail);

rentalRouter.post('/', rentalController.createRental);

export default rentalRouter;
