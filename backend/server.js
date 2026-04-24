const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors()); // Enable CORS
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
