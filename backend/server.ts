import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 8080;

const app = express();
app.use(cors()); // Enable CORS

//All middleware that want to access everywhere come up
//also if some function are wanted to acces only on ceratin pade, u can pass it on as a second parameter

app.get('/', (req, res) => {
  console.log('hello');
  res.send('helloo');
});

/*
These worked with AWS 
const port = parseInt(process.env.PORT || '3000', 10);
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from Backend!' });
});
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/
//api for instruments

import instrumentRouter from './src/routes/instruments';
app.use('/instruments', instrumentRouter);

//api for rentals
import rentalRouter from './src/routes/rentals';
app.use('/rentals', rentalRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

/*
Notes for myself:

- probably gonna use res.json() aka send json for frontend
- And other is to rendering html file res.render()
*/
