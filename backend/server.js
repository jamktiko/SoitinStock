const express = require('express');
const cors = require('cors');
const app = express();

const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Backend!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
