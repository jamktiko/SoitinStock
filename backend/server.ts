import express from 'express';
import cors from 'cors';
import './src/config/db';
import { setup } from './src/model/setup';

const port = Number(process.env.PORT || 8080);

const app = express();
app.use(cors()); // Enable CORS

//All middleware that want to access everywhere come up
//also if some function are wanted to acces only on ceratin pade, u can pass it on as a second parameter

async function settingUp() {
  await setup();
  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
}

settingUp();

app.get('/api/test', (req, res) => {
  // console.log('hello');
  // res.send('helloo');
  res.json({ message: 'hello from Backend' });
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
app.use('/api/instruments', instrumentRouter);

//api for rentals
import rentalRouter from './src/routes/rentals';
app.use('/api/rentals', rentalRouter);

import itemRouter from './src/routes/items';
app.use('/api/items', itemRouter);

import typeRouter from './src/routes/types';
app.use('/api/types', typeRouter);

//api for test
// import testrouter from './src/routes/test';
// app.use('/api/test', testrouter);

/*
Notes for myself:

- probably gonna use res.json() aka send json for frontend
- And other is to rendering html file res.render()
*/
